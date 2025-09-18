import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import locationRoutes from "./routes/location";
import userRoutes from "./routes/user";
import http from "http";
import { WebSocketServer } from "ws";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/location", locationRoutes);
app.use("/api/users", userRoutes);

const PORT = Number(process.env.PORT || 5000);
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "distil-whisper/distil-medium.en";
// You can tune these thresholds
const AUTO_SEND_SIZE_BYTES = Number(process.env.AUTO_SEND_SIZE_BYTES || 200_000);
const AUTO_SEND_MS = Number(process.env.AUTO_SEND_MS || 2500);

if (!HF_API_KEY) {
  console.warn("Warning: HF_API_KEY is not set. Transcription WS endpoint will not function until you set HF_API_KEY in .env");
}

// Create HTTP server from express app so we can attach ws to the same port
const server = http.createServer(app);

// Attach WebSocket server
const wss = new WebSocketServer({ noServer: true });

// Upgrade handler to accept WebSocket connections on the same HTTP server
server.on("upgrade", (request, socket, head) => {
  // Accept upgrades for a specific path (e.g. /ws/transcribe)
  // Change the path if you want multiple ws endpoints
  const { url } = request;
  if (url && url.startsWith("/ws/transcribe")) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on("connection", (ws) => {
  console.log("Transcription client connected");
  let buffers: Buffer[] = [];
  let lastSendAt = Date.now();

  ws.on("message", async (message) => {
    try {
      const str = typeof message === "string" ? message : message.toString();
      const payload = JSON.parse(str);

      if (payload.type === "chunk" && payload.audio) {
        // Expect payload.audio to be base64 encoded audio (e.g. webm from MediaRecorder)
        const chunk = Buffer.from(payload.audio, "base64");
        buffers.push(chunk);

        const totalSize = buffers.reduce((s, b) => s + b.length, 0);
        if (totalSize > AUTO_SEND_SIZE_BYTES || Date.now() - lastSendAt > AUTO_SEND_MS) {
          await sendTranscription();
        }
      } else if (payload.type === "segmentEnd") {
        await sendTranscription();
      } else if (payload.type === "stop") {
        await sendTranscription();
        ws.send(JSON.stringify({ type: "done" }));
      } else {
        // unknown message - ignore or log
      }
    } catch (err) {
      console.error("WS message handling error:", err);
      try {
        ws.send(JSON.stringify({ type: "error", message: (err as Error).message || String(err) }));
      } catch {}
    }
  });

  ws.on("close", () => {
    console.log("Transcription client disconnected");
    buffers = [];
  });

  async function sendTranscription() {
    if (!HF_API_KEY) {
      try {
        ws.send(JSON.stringify({ type: "error", message: "HF_API_KEY not configured on server." }));
      } catch {}
      buffers = [];
      lastSendAt = Date.now();
      return;
    }

    if (buffers.length === 0) return;
    const combined = Buffer.concat(buffers);
    buffers = [];
    lastSendAt = Date.now();

    try {
      // POST audio bytes to Hugging Face Inference API
      const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "audio/webm",
        },
        body: combined,
      });

      const ct = res.headers.get("content-type") || "";
      let text = "";
      if (ct.includes("application/json")) {
        const j = await res.json();
        // HF ASR usually returns { "text": "..." }
        text = (j && j.text) ? j.text : JSON.stringify(j);
      } else {
        text = await res.text();
      }

      ws.send(JSON.stringify({ type: "transcription", text }));
    } catch (err) {
      console.error("Transcription request failed:", err);
      try {
        ws.send(JSON.stringify({ type: "error", message: String(err) }));
      } catch {}
    }
  }
});

// Start HTTP + WS server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket transcription endpoint available at ws://localhost:${PORT}/ws/transcribe`);
});