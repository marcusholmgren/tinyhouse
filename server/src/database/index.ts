import { MongoClient } from "mongodb";
import { Database, Booking, User, Listing } from "../lib/types";

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("main");

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
  };
};
