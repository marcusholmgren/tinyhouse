import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Alert, Avatar, Button, List, Spin } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
    DeleteListing as DeleteListingsData,
    DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { ListingsSkeleton } from "./components";
import "./styles/listings.css";

const LISTINGS = gql`
    query Listings {
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
    }
`;

const DELETE_LISTING = gql`
    mutation DeleteListing($id: ID!) {
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
    }
`;

interface Props {
    title: string;
}

export const Listings = ({ title }: Props) => {
    const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);
    const [
        deleteListing,
        { loading: deleteLoading, error: deleteError },
    ] = useMutation<DeleteListingsData, DeleteListingVariables>(DELETE_LISTING);

    const listings = data?.listings ?? null;

    const handleDeleteListing = async (id: string) => {
        await deleteListing({ variables: { id } });
        refetch();
    };

    const listingsList = listings ? (
        <List
            itemLayout="horizontal"
            dataSource={listings}
            renderItem={(listing) => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"
                            onClick={() => handleDeleteListing(listing.id)}
                        >
                            Delete
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        key={listing.id}
                        title={listing.title}
                        description={listing.address}
                        avatar={
                            <Avatar
                                src={listing.image}
                                shape="square"
                                size={48}
                            />
                        }
                    />
                </List.Item>
            )}
        ></List>
    ) : null;

    if (loading) {
        return (
            <div className="listings">
                <ListingsSkeleton title={title} />
            </div>
        );
    }
    if (error) {
        return (
            <div className="listings">
                <ListingsSkeleton title={title} error={true} />
            </div>
        );
    }

    const deleteListingErrorAlert = deleteError ? (
        <Alert
            type="error"
            message={
                <>
                    Oh no! Something went wrong - please try again later
                    <span role="img" aria-label="Sad face emoji">
                        😞
                    </span>
                </>
            }
            className="listing__alert"
        />
    ) : null;

    return (
        <div className="listings">
            <Spin spinning={deleteLoading || loading}>
                {deleteListingErrorAlert}
                <h2>{title}</h2>
                <ul>{listingsList}</ul>
            </Spin>
        </div>
    );
};
