import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Col, Layout, Row } from "antd";
import { USER } from "../../lib/graphql/queries/User";
import {
    User as UserData,
    UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { UserProfile } from "./components";
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface UserProps {
    viewer: Viewer;
}

const { Content } = Layout;

export function User({ viewer }: UserProps) {
    const { userId } = useParams();
    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: userId,
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

    const userProfileElement = user ? (
        <UserProfile user={user} viewerIsUser={viewerIsUser} />
    ) : null;

    return (
        <Content>
            <Row gutter={12} justify="space-between">
                <Col xs={24}>{userProfileElement}</Col>
            </Row>
        </Content>
    );
}
