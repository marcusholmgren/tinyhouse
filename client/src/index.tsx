import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import {Home, Host, Listing, Listings, NotFound, User} from './sections';
import './styles/index.css';


const client = new ApolloClient({
    uri: "/api",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/host" element={<Host/>} />
                <Route path="/listing/:id" element={<Listing/>} />
                <Route path="/listings" element={<Listings title="TinyHouse Listings" />}>
                    <Route path="/:location" element={<Listings title="TinyHouse Listings" />} />
                </Route>
                <Route path="/user/:id" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
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
