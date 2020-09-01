import merge from "lodash.merge";
import { viewResolvers } from "./Viewer";
import { userResolvers } from "./User";
import { listingResolvers } from "./Listing";
import { bookingsResolver } from "./Booking";

export const resolvers = merge(
    bookingsResolver,
    listingResolvers,
    viewResolvers,
    userResolvers
);
