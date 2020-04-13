import React from 'react';
import {render} from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker';
import {Listings} from './sections'


const client = new ApolloClient({
    uri: "/api"
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Listings title="TinyHouse Listings" />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
