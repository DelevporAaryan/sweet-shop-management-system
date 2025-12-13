import { Request, Response } from 'express';
import Sweet from '../models/Sweet';
import mongoose from 'mongoose';
export async function createSweet(req: Request, res: Response){
  const { name, category, price, quantity } = req.body;
  if(!name || price==null || quantity==null) return res.status(400).json({ error: 'missing fields' });
  const sweet = await Sweet.create({ name, category, price: Number(price), quantity: Number(quantity) });
  res.status(201).json(sweet);
}
export async function listSweets(req: Request, res: Response){
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  res.json(sweets);
}
export async function searchSweets(req: Request, res: Response){
  const { name, category, minPrice, maxPrice } = req.query as any;
  const filter:any = {};
  if(name) filter.name = { $regex: name, $options: 'i' };
  if(category) filter.category = { $regex: category, $options: 'i' };
  if(minPrice||maxPrice) filter.price = {};
  if(minPrice) filter.price.$gte = Number(minPrice);
  if(maxPrice) filter.price.$lte = Number(maxPrice);
  const sweets = await Sweet.find(filter);
  res.json(sweets);
}
export async function updateSweet(req: Request, res: Response){
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  try{
    const updated = await Sweet.findByIdAndUpdate(id, { name, category, price: price!=null?Number(price):undefined, quantity: quantity!=null?Number(quantity):undefined }, { new: true });
    if(!updated) return res.status(404).json({ error: 'Sweet not found' });
    res.json(updated);
  }catch(e){ res.status(400).json({ error: 'invalid id' }); }
}
export async function deleteSweet(req: Request, res: Response){
  const { id } = req.params;
  const deleted = await Sweet.findByIdAndDelete(id);
  if(!deleted) return res.status(404).json({ error: 'Sweet not found' });
  res.status(204).send();
}
export async function purchaseSweet(req: Request, res: Response){
  const { id } = req.params;
  const { qty } = req.body as { qty?: number };
  const q = qty!=null?Number(qty):1;
  if(q<=0) return res.status(400).json({ error: 'qty must be > 0' });
  // use transaction with mongoose session
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    const s = await Sweet.findById(id).session(session);
    if(!s) { await session.abortTransaction(); return res.status(404).json({ error: 'Sweet not found' }); }
    if(s.quantity < q){ await session.abortTransaction(); return res.status(400).json({ error: 'Insufficient stock' }); }
    s.quantity -= q;
    await s.save({ session });
    await session.commitTransaction();
    res.json(s);
  }catch(e){
    await session.abortTransaction();
    res.status(500).json({ error: 'server error' });
  }finally{ session.endSession(); }
}
export async function restockSweet(req: Request, res: Response){
  const { id } = req.params;
  const { qty } = req.body as { qty?: number };
  const q = qty!=null?Number(qty):1;
  if(q<=0) return res.status(400).json({ error: 'qty must be > 0' });
  const updated = await Sweet.findByIdAndUpdate(id, { $inc: { quantity: q } }, { new: true });
  if(!updated) return res.status(404).json({ error: 'Sweet not found' });
  res.json(updated);
}
