import React from 'react'
import {Card, Layout, Typography} from 'antd'
import googleLogo from './assests/google_logo.jpg'

const { Content } = Layout
const {Text, Title } = Typography

export function Login() {
    return (
        <Content className="log-in">
            <Card className="log-in-card">
                <div className="log-in-card__intro-title">
                    <Title level={3} className="log-in-card__intro-title">
                        <span role="img" aria-label="wave">
                            👋
                        </span>
                    </Title>
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to TinyHouse!
                    </Title>
                    <Text>Sign in with Google to book available rentals!</Text>
                </div>
                <button className="log-in-card__google-button">
                    <img alt="Google logo" className="log-in-card__google-button-logo" src={googleLogo}/>
                    <span className="log-in-card__google-button-text">
                        Sign in with Google!
                    </span>
                </button>
                <Text type="secondary">
                    Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account.
                </Text>
            </Card>
        </Content>
    )
}