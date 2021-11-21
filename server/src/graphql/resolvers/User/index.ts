import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import {
    UserArgs,
    UserBookingsArgs,
    UserBookingsData,
    UserListingsArgs,
    UserListingsData,
} from "./types";
import { calculateSkip } from "../utils";

export const userResolvers: IResolvers = {
    Query: {
        user: userQuery,
    },
    User: {
        id: getUserId,
        hasWallet: userHasWallet,
        income: getUserIncome,
        bookings: getUserBookings,
        listings: getUserListings,
    },
};

async function getUserListings(
    user: User,
    { limit, page }: UserListingsArgs,
    { db }: { db: Database }
): Promise<UserListingsData> {
    try {
        const data: UserListingsData = {
            total: 0,
            result: [],
        };

        if (!user) {
            return data;
        }

        let cursor = db.listings.find({
            _id: { $in: user.listings },
        });

        cursor = cursor.skip(calculateSkip(page, limit));
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
    } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
    }
}

async function getUserBookings(
    user: User,
    { limit, page }: UserBookingsArgs,
    { db }: { db: Database }
): Promise<UserBookingsData | null> {
    try {
        if (!user.authorized) {
            return null;
        }

        const data: UserBookingsData = {
            total: 0,
            result: [],
        };

        let cursor = db.bookings.find({
            _id: { $in: user.bookings },
        });

        cursor = cursor.skip(calculateSkip(page, limit));
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
    } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
    }
}

function getUserIncome(user: User): number | null {
    return user.authorized ? user.income : null;
}

function userHasWallet(user: User): boolean {
    return Boolean(user.walletId);
}

function getUserId(user: User): string {
    return user._id;
}

async function userQuery(
    _root: undefined,
    { id }: UserArgs,
    { db, req }: { db: Database; req: Request }
): Promise<User> {
    try {
        const user = await db.users.findOne({
            _id: id,
        });

        if (!user) {
            throw new Error("User can't be found");
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id === user._id) {
            user.authorized = true;
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
    }
}
