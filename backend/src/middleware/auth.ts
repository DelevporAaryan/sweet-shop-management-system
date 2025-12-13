import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
export async function authMiddleware(req: Request, res: Response, next: NextFunction){
  const h = req.headers.authorization;
  if(!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = h.split(' ')[1];
  try{
    const payload:any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if(!user) return res.status(401).json({ error: 'Unauthorized' });
    (req as any).user = { id: user._id.toString(), role: user.role };
    next();
  }catch(e){ return res.status(401).json({ error: 'Invalid token' }); }
}
export function requireAdmin(req: Request, res: Response, next: NextFunction){
  const u = (req as any).user;
  if(!u) return res.status(401).json({ error: 'Unauthorized' });
  if(u.role !== 'ADMIN') return res.status(403).json({ error: 'Admin only' });
  next();
}
