import { IResolvers } from "apollo-server-express";
import { Booking, Database, Listing } from "../../../lib/types";

export const bookingsResolver: IResolvers = {
    Booking: {
        id: getBookingId,
        listing: getBookingListing,
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
