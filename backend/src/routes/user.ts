import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
