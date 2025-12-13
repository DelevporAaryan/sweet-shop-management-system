import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
let mongod: MongoMemoryServer;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
describe('Auth', () => {
  it('registers and logs in', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 't@test.com', password: 'Pass123!' }).expect(201);
    expect(res.body.token).toBeDefined();
    const login = await request(app).post('/api/auth/login').send({ email: 't@test.com', password: 'Pass123!' }).expect(200);
    expect(login.body.token).toBeDefined();
  });
});
