import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../lib/types";

export const resolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deletedResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (deletedResult.value) {
        return deletedResult.value;
      }
      throw new Error(
        `Could not be found. ${JSON.stringify(deletedResult.lastErrorObject)}`
      );
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
