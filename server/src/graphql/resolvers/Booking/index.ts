import { IResolvers } from "@graphql-tools/utils";
import { Booking, Database, Listing, User } from "../../../lib/types";

export const bookingsResolver: IResolvers = {
    Booking: {
        id: getBookingId,
        listing: getBookingListing,
        tenant: getBookingTenant,
    },
};

function getBookingId(booking: Booking): string {
    return booking._id.toString();
}

async function getBookingListing(
    booking: Booking,
    _args: unknown,
    { db }: { db: Database }
): Promise<Listing | null> {
    return await db.listings.findOne({ _id: booking.listing });
}

async function getBookingTenant(
    booking: Booking,
    _args: unknown,
    { db }: { db: Database }
): Promise<User | null> {
    return await db.users.findOne({ _id: booking.tenant });
}
