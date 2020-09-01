import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Col, Layout, Row } from "antd";
import { USER } from "../../lib/graphql/queries/User";
import {
    User as UserData,
    UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { UserBookings, UserListings, UserProfile } from "./components";
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface UserProps {
    viewer: Viewer;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export function User({ viewer }: UserProps) {
    const [listingsPage, setListingsPage] = useState(1);
    const [bookingsPage, setBookingsPage] = useState(1);
    const { userId } = useParams();
    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: userId,
            bookingsPage: bookingsPage,
            listingsPage: listingsPage,
            limit: PAGE_LIMIT,
        },
    });

    if (loading) {
        return (
            <Content className="user">
                <PageSkeleton />
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="user">
                <ErrorBanner description="This user may not exists we've encountered an error. Please try again later" />
                <PageSkeleton />
            </Content>
        );
    }

    const user = data ? data.user : null;
    const viewerIsUser = viewer.id === userId;

    const userListings = user?.listings ?? null;
    const userBookings = user?.bookings ?? null;

    const userProfileElement = user ? (
        <UserProfile user={user} viewerIsUser={viewerIsUser} />
    ) : null;

    const userListingsElement = userListings ? (
        <UserListings
            userListings={userListings}
            page={listingsPage}
            limit={PAGE_LIMIT}
            setListingsPage={setListingsPage}
        />
    ) : null;

    const userBookingsElement = userBookings ? (
        <UserBookings
            userBookings={userBookings}
            page={bookingsPage}
            limit={PAGE_LIMIT}
            setBookingsPage={setBookingsPage}
        />
    ) : null;

    return (
        <Content>
            <Row gutter={12} justify="space-between">
                <Col xs={24}>{userProfileElement}</Col>
                <Col xs={24}>{userBookingsElement}</Col>
                <Col xs={24}>{userListingsElement}</Col>
            </Row>
        </Content>
    );
}
