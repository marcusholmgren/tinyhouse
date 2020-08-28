import React, {useEffect, useRef} from 'react'
import {useApolloClient, useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-dom';
import {Card, Layout, Typography, Spin} from 'antd'
import googleLogo from './assests/google_logo.jpg'
import {Viewer} from "../../lib/types";
import {ErrorBanner} from "../../lib/components/ErrorBanner";
import {displayErrorMessage, displaySuccessNotification} from "../../lib/utils";
import {LOG_IN} from "../../lib/graphql/mutations";
import {AUTH_URL} from "../../lib/graphql/queries";
import {AuthUrl as AuthUrlData} from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import {LogIn as LogInData, LogInVariables} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn'

interface LoginProps {
    setViewer: (viewer: Viewer) => void
}

const {Content} = Layout
const {Text, Title} = Typography

export function Login({setViewer}: LoginProps) {
    const client = useApolloClient();
    const [logIn, { loading: logInLoading, error: loginError }
    ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: data => {
            if (data && data.logIn) {
                setViewer(data.logIn)
                displaySuccessNotification("You've successfully logged in!")
                const {id: viewerId} = data.logIn
                navigate(`/user/${viewerId}`)
            }
        }
    })
    const logInRef = useRef(logIn);
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            })
        }
    }, [])
    const handleAuthorize = async () => {
        try {
            const {data} = await client.query<AuthUrlData>({
                query: AUTH_URL
            })
            if (data) {
                window.location.href = data.authUrl
            }
        } catch {
            displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!")
        }
    }
    if (logInLoading) {
        return (
            <Content className="log-in">
                <Spin size="large" tip="Logging you in..." />
            </Content>
        )
    }

    const logInErrorBanner = loginError ? <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" /> : null
    return (
        <Content className="log-in">
            {logInErrorBanner}
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
                <button className="log-in-card__google-button" onClick={handleAuthorize}>
                    <img alt="Google logo" className="log-in-card__google-button-logo" src={googleLogo}/>
                    <span className="log-in-card__google-button-text">
                        Sign in with Google!
                    </span>
                </button>
                <Text type="secondary">
                    Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google
                    account.
                </Text>
            </Card>
        </Content>
    )
}