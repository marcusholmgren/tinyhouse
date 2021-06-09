import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Col, Layout, Row } from "antd";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { LISTING } from "../../lib/graphql/queries/Listing";
import {
    Listing as ListingData,
    ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { useParams } from "react-router";
import { ListingDetails, ListingBookings } from "./components";

const PAGE_LIMIT = 3;
const { Content } = Layout;

export function Listing() {
    const [bookingsPage, setBookingsPage] = useState(1);
    const { listingId } = useParams();
    const { loading, data, error } = useQuery<ListingData, ListingVariables>(
        LISTING,
        {
            variables: {
                id: listingId,
                bookingsPage: bookingsPage,
                limit: PAGE_LIMIT,
            },
        }
    );

    if (loading) {
        return (
            <Content className="listing">
                <PageSkeleton />
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="listing">
                <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
                <PageSkeleton />
            </Content>
        );
    }

    const listing = data ? data.listing : null;
    const listingBookings = listing ? listing.bookings : null;

    const listingDetailsElement = listing ? (
        <ListingDetails listing={listing} />
    ) : null;

    const listingBookingsElement = listingBookings ? (
        <ListingBookings
            listingBookings={listingBookings}
            bookingsPage={bookingsPage}
            limit={PAGE_LIMIT}
            setBookingsPage={setBookingsPage}
        />
    ) : null;

    return (
        <Content className="listing">
            <Row gutter={24} justify="space-between">
                <Col xs={24}>{listingDetailsElement}</Col>
            </Row>
            <Row gutter={24} justify="space-between">
                <Col xs={24}>{listingBookingsElement}</Col>
            </Row>
        </Content>
    );
}
