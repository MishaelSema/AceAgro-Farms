import mongoose, { Schema, Document, Model } from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGO_URL environment variable');
    }

    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getModel<T extends Document>(modelName: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[modelName] as Model<T>) || mongoose.model<T>(modelName, schema);
}

export { mongoose };
export default dbConnect;
