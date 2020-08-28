import React, {useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Layout} from 'antd';
import * as serviceWorker from './serviceWorker';
import {Home, Host, Listing, Listings, Login, NotFound, User} from './sections';
import {Viewer} from "./lib/types";
import './styles/index.css';


const client = new ApolloClient({
    uri: "/api",
    cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);
    console.log(viewer)
    return (
        <BrowserRouter>
            <Layout id="app">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/host" element={<Host/>}/>
                    <Route path="/listing/:id" element={<Listing/>}/>
                    <Route path="/listings" element={<Listings title="TinyHouse Listings"/>}>
                        <Route path="/:location" element={<Listings title="TinyHouse Listings"/>}/>
                    </Route>
                    <Route path="/login" element={<Login setViewer={setViewer}/>}/>
                    <Route path="/user/:id" element={<User/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

render(
    <>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
