import * as React from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import dubaiImage from "../../assets/dubai.jpg";
import londonImage from "../../assets/london.jpg";
import losAngelesImage from "../../assets/los-angeles.jpg";
import torontoImage from "../../assets/toronto.jpg";

const { Title } = Typography;
const { Search } = Input;

interface HomeHeroProps {
    onSearch: (value: string) => void;
}

export function HomeHero({ onSearch }: HomeHeroProps) {
    return (
        <div className="home-hero">
            <div className="home-hero__search">
                <Title className="home-hero__title">
                    Find a place you'll love to stay at
                </Title>
                <Search
                    placeholder="Search 'San Fransisco'"
                    size="large"
                    enterButton
                    className="home_hero__search-input"
                    onSearch={onSearch}
                />
            </div>
            <Row gutter={12} className="home-hero__cards">
                <Col xs={12} md={6}>
                    <Link to="/listings/toronto">
                        <Card cover={<img alt="Toronto" src={torontoImage} />}>
                            Toronto
                        </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6}>
                    <Link to="/listings/dubai">
                        <Card cover={<img alt="Dubai" src={dubaiImage} />}>
                            Dubai
                        </Card>
                    </Link>
                </Col>
                <Col xs={0} md={6}>
                    <Link to="/listings/los%20angeles">
                        <Card
                            cover={
                                <img alt="Los Angeles" src={losAngelesImage} />
                            }
                        >
                            Los Angeles
                        </Card>
                    </Link>
                </Col>
                <Col xs={0} md={6}>
                    <Link to="/listings/london">
                        <Card cover={<img alt="London" src={londonImage} />}>
                            London
                        </Card>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}
