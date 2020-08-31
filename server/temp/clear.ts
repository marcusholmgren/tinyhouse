// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { connectDatabase } from "../src/database";

const clear = async () => {
    try {
        console.log("[clear] : running...");

        const db = await connectDatabase();

        const bookings = await db.bookings.find({}).count();
        const listings = await db.listings.find({}).count();
        const users = await db.users.find({}).count();

        if (bookings > 0) {
            await db.bookings.drop();
        }

        if (listings > 0) {
            await db.listings.drop();
        }

        if (users > 0) {
            await db.users.drop();
        }

        console.log("[clear] : success");
    } catch {
        throw new Error("failed to clear database");
    }
};

clear();
