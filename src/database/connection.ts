import { MongoClient } from "mongodb";

const url = "mongodb://admin:strongPassword@127.0.0.1:27017/pdf_scan_api"; // user + password
const client = new MongoClient(url);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB ga ulanish muvaffaqiyatli");
    return client.db();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
