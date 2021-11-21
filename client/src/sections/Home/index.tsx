import React from "react";
import { Col, Row, Layout, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HomeHero } from "./components";
import { displayErrorMessage } from "../../lib/utils";

import mapBackground from "./assets/map-background.jpg.png";
import sanFranciscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export function Home() {
    const navigate = useNavigate();

    function onSearch(value: string) {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            navigate(`/search?q=${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search term");
        }
    }

    return (
        <Content
            className="home"
            style={{ backgroundImage: `url(${mapBackground})` }}
        >
            <HomeHero onSearch={onSearch} />

            <div className="home__cta-section">
                <Title level={2} className="home__cta-section-title">
                    Your guide for all things rental
                </Title>
                <Paragraph>
                    Helping you make the best decision in making your last
                    minute rental
                </Paragraph>
                <Link
                    to="/listings/united%20states"
                    className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
                >
                    Popular listings in the United States
                </Link>
            </div>

            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listing of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20fransisco">
                            <div className="home__listings-img-cover">
                                <img
                                    src={sanFranciscoImage}
                                    alt="San Francisco"
                                    className="home__listings-img"
                                />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancún">
                            <div className="home__listings-img-cover">
                                <img
                                    src={cancunImage}
                                    alt="Cancun"
                                    className="home__listings-img"
                                />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
