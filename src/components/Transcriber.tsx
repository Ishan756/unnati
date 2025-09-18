import React, { useEffect, useRef, useState } from "react";

/**
 * Make sure VITE_WS_URL is set in .env.local (example: VITE_WS_URL=ws://localhost:5000/ws/transcribe)
 * Fallback defaults to ws://localhost:5000/ws/transcribe (matches express/index.ts with default PORT=5000)
 */
const WS_URL = (import.meta.env.VITE_WS_URL as string) || "ws://localhost:5000/ws/transcribe";

export default function Transcriber() {
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [recording, setRecording] = useState(false);

  // queue outgoing messages until socket is OPEN
  const sendQueueRef = useRef<string[]>([]);
  const segmentTimerRef = useRef<number | null>(null);

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  // create and connect websocket, return a promise that resolves when open
  function connectWebSocket(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      // if already connected/open return it
      const existing = wsRef.current;
      if (existing && existing.readyState === WebSocket.OPEN) {
        return resolve(existing);
      }

      try {
        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        const onOpen = () => {
          // flush queued messages
          try {
            while (sendQueueRef.current.length > 0 && ws.readyState === WebSocket.OPEN) {
              const msg = sendQueueRef.current.shift()!;
              ws.send(msg);
            }
          } catch (e) {
            console.error("Error sending queued message", e);
          }
          resolve(ws);
        };

        const onMessage = (ev: MessageEvent) => {
          // handle transcription and errors from server
          try {
            const payload = JSON.parse(ev.data);
            if (payload?.type === "transcription") {
              setTranscript((t) => (t ? t + " " + payload.text : payload.text));
            } else if (payload?.type === "error") {
              console.error("Server error:", payload.message);
            }
          } catch {
            // ignore if non-json or unexpected
            // console.log("ws message", ev.data);
          }
        };

        const onError = (err: Event) => {
          console.error("WebSocket error", err);
        };

        const onClose = () => {
          // cleanup on close
          ws.removeEventListener("open", onOpen);
          ws.removeEventListener("message", onMessage);
          ws.removeEventListener("error", onError);
          ws.removeEventListener("close", onClose);
          if (wsRef.current === ws) wsRef.current = null;
        };

        ws.addEventListener("open", onOpen);
        ws.addEventListener("message", onMessage);
        ws.addEventListener("error", onError);
        ws.addEventListener("close", onClose);

        // timeout if socket doesn't open in reasonable time
        const timeout = setTimeout(() => {
          if (ws.readyState !== WebSocket.OPEN) {
            // remove listeners to avoid memory leak
            ws.close();
            reject(new Error("WebSocket connection timed out"));
          }
        }, 5000);
        // clear timeout on successful open via resolve
        const origResolve = resolve;
        resolve = (value: WebSocket | PromiseLike<WebSocket>) => {
          clearTimeout(timeout);
          origResolve(value as WebSocket);
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  // safe send: if socket is OPEN send immediately, otherwise queue
  function safeSend(obj: any) {
    const msg = JSON.stringify(obj);
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(msg);
      } catch (err) {
        console.error("send failed:", err);
      }
    } else {
      // queue it, will be flushed when socket opens
      sendQueueRef.current.push(msg);
    }
  }

  async function start() {
    if (recording) return;

    // get mic stream
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error("Microphone permission denied or not available", err);
      return;
    }

    // create recorder but do not start until ws is ready
    const mimeType = "audio/webm;codecs=opus";
    let mediaRecorder: MediaRecorder;
    try {
      mediaRecorder = new MediaRecorder(stream, { mimeType });
    } catch (err) {
      // fallback if mimeType is not supported
      mediaRecorder = new MediaRecorder(stream);
    }
    mediaRecorderRef.current = mediaRecorder;

    // register dataavailable handler which uses safeSend/queue
    mediaRecorder.ondataavailable = async (event) => {
      if (!event.data || event.data.size === 0) return;
      try {
        const arr = await event.data.arrayBuffer();
        const b64 = arrayBufferToBase64(arr);
        safeSend({ type: "chunk", audio: b64 });
      } catch (e) {
        console.error("Failed to process audio chunk", e);
      }
    };

    // Connect websocket (or reuse existing); wait for open before starting recorder
    try {
      await connectWebSocket();
    } catch (err) {
      console.error("Failed to open WebSocket:", err);
      // stop tracks if cannot connect
      stream.getTracks().forEach(t => t.stop());
      mediaRecorderRef.current = null;
      return;
    }

    // start recording and segment timer
    try {
      mediaRecorder.start(1500); // request dataavailable roughly every 1.5s
    } catch (err) {
      console.error("Failed to start MediaRecorder", err);
      stream.getTracks().forEach(t => t.stop());
      mediaRecorderRef.current = null;
      return;
    }

    // periodic segmentEnd to limit latency
    const segmentTimer = window.setInterval(() => {
      safeSend({ type: "segmentEnd" });
    }, 2500);
    segmentTimerRef.current = segmentTimer;

    setRecording(true);
  }

  function stop() {
    if (!recording) return;

    const mediaRecorder = mediaRecorderRef.current;
    const ws = wsRef.current;

    if (mediaRecorder) {
      const timer = segmentTimerRef.current;
      if (timer) {
        clearInterval(timer);
        segmentTimerRef.current = null;
      }
      try {
        mediaRecorder.stop();
      } catch (e) {
        console.warn("mediaRecorder.stop() threw", e);
      }
      try {
        mediaRecorder.stream.getTracks().forEach((t) => t.stop());
      } catch {}
      mediaRecorderRef.current = null;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      safeSend({ type: "stop" });
      try {
        ws.close(); 
      } catch {}
    } else {
      // if socket not open, clear queued messages and close anyway
      sendQueueRef.current = [];
      if (ws) try { ws.close(); } catch {}
    }

    wsRef.current = null;
    setRecording(false);
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
      <h3>Live Transcription</h3>
      <div>
        <button onClick={start} disabled={recording}>Start</button>
        <button onClick={stop} disabled={!recording}>Stop</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <strong>Transcript:</strong>
        <div style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{transcript}</div>
      </div>
    </div>
  );
}