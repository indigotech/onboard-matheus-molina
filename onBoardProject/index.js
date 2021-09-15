/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import App from './App';
import {name as appName} from './app.json';
import {LoginScreen} from './screens/login_screen';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import React from 'react';
import {HomeScreen} from './screens/home_screnn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from './features/apollo_management';

Navigation.registerComponent(
  'LoginPage',
  () => props =>
    (
      <ApolloProvider client={client}>
        <LoginScreen {...props} title={'Bem-vindo(a) à Taqtile!'} />
      </ApolloProvider>
    ),
  () => LoginScreen,
);

Navigation.registerComponent(
  'HomePage',
  () => props =>
    (
      <ApolloProvider client={client}>
        <HomeScreen {...props} />
      </ApolloProvider>
    ),
  () => HomeScreen,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'LoginPage',
            },
          },
        ],
      },
    },
  });
});
