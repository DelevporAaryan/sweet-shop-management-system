import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../src/models/User';
import bcrypt from 'bcrypt';
const mongo = process.env.MONGO_URL || 'mongodb://localhost:27017/sweetshop_dev';
async function main(){
  await mongoose.connect(mongo);
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const pass = process.env.SEED_ADMIN_PW || 'Admin123!';
  const hashed = await bcrypt.hash(pass, 10);
  await User.updateOne({ email }, { $setOnInsert: { email, password: hashed, name: 'Admin', role: 'ADMIN' } }, { upsert: true });
  console.log('Seeded admin', email);
  process.exit(0);
}
main().catch(e=>{ console.error(e); process.exit(1); });
