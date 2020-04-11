import React from 'react'
import {server} from '../../lib/api'
import { DeleteListingsData, DeleteListingsVariables, ListingsData } from './types'

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
    const fetchListing = async () => {
        const {data}= await server.fetch<ListingsData>({ query: LISTINGS })
        console.log(data)
    };

    const deleteListing = async () => {
        const {data} = await server.fetch<DeleteListingsData, DeleteListingsVariables>({
            query: DELETE_LISTING,
            variables: { id: "5e8f71461d638430feb863ab" }
        })
        console.log(data);
    }

    return <div>
        <h2>{title}</h2>
        <button onClick={fetchListing}>Query Listings!</button>
        <button onClick={deleteListing}>Delete Listings!</button>
    </div>
}
