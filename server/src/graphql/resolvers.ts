import { IResolvers } from "apollo-server-express";
import { listings } from "../listing";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    },
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      const index = listings.findIndex((x) => x.id === id);
      if (index >= 0) {
        return listings.splice(index, 1)[0];
      }
      throw new Error("Could not be found.");
    },
  },
};
