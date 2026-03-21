const MONGODB_URI = process.env.MONGO_URL;

interface MongooseCache {
  conn: any;
  promise: any;
}

declare global {
  var mongooseGlobalCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseGlobalCache || { conn: null, promise: null };

if (!global.mongooseGlobalCache) {
  global.mongooseGlobalCache = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      return null;
    }

    const mongoose = (await import('mongoose')).default;
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
