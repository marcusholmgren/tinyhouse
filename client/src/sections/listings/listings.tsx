import React from 'react'
import {server, useQuery} from '../../lib/api'
import { DeleteListingsData, DeleteListingsVariables, ListingsData, Listing } from './types'

const LISTINGS = `query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}`;

const DELETE_LISTING = `mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
    id
    title
    image
    address
    price
    numOfBeds
    numOfBaths
    numOfGuests
    rating
  }
}`;


interface Props {
    title: string
}
export const Listings = ({ title }: Props) => {
    const {data, refresh} = useQuery<ListingsData>(LISTINGS);
    const listings = data?.listings ?? null;

    const deleteListing = async (id: string) => {
        await server.fetch<DeleteListingsData, DeleteListingsVariables>({
            query: DELETE_LISTING,
            variables: {id}
        });

        refresh();
    }

    const listingsList = listings?.map(listing =>
        <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
        </li>
    ) ?? null;

    return <div>
        <h2>{title}</h2>
        <ul>
            {listingsList}
        </ul>
    </div>
}
