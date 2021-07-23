// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const port = process.env.PORT;

async function mount(app: Application) {
    const db = await connectDatabase();

    app.use(cookieParser(process.env.SECRET));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ db, req, res }),
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api" });

    app.listen(port);

    console.log(`[app]: http://localhost:${port}`);
}

mount(express());
