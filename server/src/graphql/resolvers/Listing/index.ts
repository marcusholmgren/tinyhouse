import { IResolvers } from "apollo-server-express";
import { Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
    Query: {
        listing: listingQuery
    },
    Listing: {
        id: getListingId,
    },
};


function listingQuery(id: string) {
    return "Listing Query";
}

function getListingId(listing: Listing): string {
    return listing._id.toString();
}
