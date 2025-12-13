import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
const port = process.env.PORT || 4000;
const mongo = process.env.MONGO_URL || 'mongodb://localhost:27017/sweetshop_dev';
mongoose.connect(mongo).then(()=> {
  console.log('Connected to MongoDB');
  app.listen(port, ()=> console.log(`Server listening on http://localhost:${port}`));
}).catch(err=>{ console.error(err); process.exit(1); });
