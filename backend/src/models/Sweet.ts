import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Sweet', Schema);
