/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListing
// ====================================================

export interface DeleteListing_deleteListing {
    __typename: "Listing";
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfBeds: number;
    numOfBaths: number;
    numOfGuests: number;
    rating: number;
}

export interface DeleteListing {
    deleteListing: DeleteListing_deleteListing;
}

export interface DeleteListingVariables {
    id: string;
}
