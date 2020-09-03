import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Divider, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";
import { iconColor } from "../../../../lib/utils";

interface ListingDetailProps {
    listing: ListingData["listing"];
}

const { Paragraph, Title } = Typography;

export function ListingDetail({ listing }: ListingDetailProps) {
    const {
        title,
        description,
        image,
        type,
        address,
        city,
        numOfGuests,
        host,
    } = listing;

    return (
        <div className="listing-details">
            <div
                style={{ backgroundImage: `url(${image})` }}
                className="listing-details__image"
            />

            <div className="listing-details__information">
                <Paragraph
                    type="secondary"
                    ellipsis
                    className="listing-details__city-address"
                >
                    <NavLink to={`/listings/${city}`}>
                        <EnvironmentOutlined style={{ color: iconColor }} />{" "}
                        {city}
                    </NavLink>
                    <Divider type="vertical" />
                    {address}
                </Paragraph>
                <Title level={3} className="listing-details__title">
                    {title}
                </Title>
            </div>

            <Divider />

            <div className="listing-details__section">
                <NavLink to={`/user/${host.id}`}>
                    <Avatar src={host.avatar} size={64} />
                    <Title level={2} className="listing-details__host-name">
                        {host.name}
                    </Title>
                </NavLink>
            </div>

            <Divider />

            <div className="listing-details__section">
                <Title level={4}>About this space</Title>
                <div className="listing-details__about-items">
                    <Tag color="magenta">{type}</Tag>
                    <Tag color="magenta">{numOfGuests} Guests</Tag>
                </div>
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    {description}
                </Paragraph>
            </div>
        </div>
    );
}
