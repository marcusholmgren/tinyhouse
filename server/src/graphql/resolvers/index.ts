import merge from "lodash.merge";
import { viewResolvers } from "./Viewer";
import { userResolvers } from "./User";

export const resolvers = merge(viewResolvers, userResolvers);
