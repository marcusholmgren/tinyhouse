import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Col, Layout, Row } from "antd";
import { Moment } from "moment";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { LISTING } from "../../lib/graphql/queries/Listing";
import {
    Listing as ListingData,
    ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { useParams } from "react-router";
import {
    ListingDetails,
    ListingCreateBooking,
    ListingBookings,
} from "./components";

const PAGE_LIMIT = 3;
const { Content } = Layout;

export function Listing() {
    const [bookingsPage, setBookingsPage] = useState(1);
    const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
    const { listingId } = useParams();
    const { loading, data, error } = useQuery<ListingData, ListingVariables>(
        LISTING,
        {
            variables: {
                id: listingId ?? "",
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

    const listingCreateBookingElement = listing ? (
        <ListingCreateBooking
            price={listing.price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
        />
    ) : null;

    return (
        <Content className="listing">
            <Row gutter={24} justify="space-between">
                <Col xs={24} lg={14}>
                    {listingDetailsElement}
                    {listingBookingsElement}
                </Col>
                <Col xs={24} lg={10}>
                    {listingCreateBookingElement}
                </Col>
            </Row>
        </Content>
    );
}
