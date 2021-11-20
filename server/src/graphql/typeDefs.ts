import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Listings {
        total: Int!
        result: [Listing!]!
    }

    enum ListingType {
        APARTMENT
        HOUSE
    }

    enum ListingsFilter {
        PRICE_LOW_TO_HIGH
        PRICE_HIGH_TO_LOW
    }

    type Listing {
        id: ID!
        title: String!
        description: String!
        image: String!
        host: User!
        type: ListingType!
        address: String!
        city: String!
        bookings(limit: Int!, page: Int!): Bookings
        bookingsIndex: String!
        price: Int!
        numOfGuests: Int!
    }

    type Bookings {
        total: Int!
        result: [Booking!]!
    }

    type Booking {
        id: ID!
        listing: Listing!
        tenant: User!
        checkIn: String!
        checkOut: String!
    }

    type User {
        id: ID!
        name: String!
        avatar: String!
        contact: String!
        hasWallet: Boolean!
        income: Int
        bookings(limit: Int!, page: Int!): Bookings
        listings(limit: Int!, page: Int!): Listings!
    }

    type Viewer {
        id: ID
        token: String
        avatar: String
        hasWallet: Boolean
        didRequest: Boolean!
    }

    input LogInInput {
        code: String!
    }

    type Query {
        authUrl: String!
        user(id: ID!): User!
        listing(id: ID!): Listing!
        listings(filter: ListingsFilter!, limit: Int!, page: Int!): Listings!
    }

    type Mutation {
        logIn(login: LogInInput): Viewer!
        logOut: Viewer!
    }
`;
