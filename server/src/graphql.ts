import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat
} from "graphql";
import { listings } from "./listing";

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
    numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
    numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
    rating: { type: GraphQLNonNull(GraphQLFloat) },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    listings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
      resolve: () => listings,
    },
    hello: {
      type: GraphQLString,
      resolve: () => "Hello World!",
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteListing: {
      type: GraphQLNonNull(Listing),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_root, { id }) => {
        const index = listings.findIndex((x) => x.id === id);
        if (index >= 0) {
          return listings.splice(index, 1)[0];
        }
        throw new Error("Could not be found.");
      },
    },
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Mutation!!!",
    },
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
