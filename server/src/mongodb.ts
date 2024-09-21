import { MongoClient, ServerApiVersion } from "mongodb";
// loads env variables from .env file
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const database = client.db("main");
