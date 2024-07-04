import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGO_URI, MONGO_DB_NAME } from '../config.js';

dotenv.config();

export async function connectToDatabase() {
  try {
    console.log('connecting to mongo database...');
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
      writeConcern: {
        w: 'majority', // Use 'majority' for default write concern
      },
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
}
