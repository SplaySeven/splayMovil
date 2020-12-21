import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//Apollo
import client from './app/recursos/config/apollo';
import {ApolloProvider} from '@apollo/client';

const splay7=()=>(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => splay7);
