import { MongoClient } from "mongodb";
const globalMongo = globalThis as typeof globalThis & { chatMongo?: Promise<MongoClient> };
export async function chatDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("CHAT_NOT_CONFIGURED");
  if (!globalMongo.chatMongo) {
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 });
    globalMongo.chatMongo = client.connect().catch(error => { globalMongo.chatMongo = undefined; throw error; });
  }
  return (await globalMongo.chatMongo).db(process.env.MONGODB_DB || "devdes_chat");
}
