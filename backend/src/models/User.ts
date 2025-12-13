import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['USER','ADMIN'], default: 'USER' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', Schema);
