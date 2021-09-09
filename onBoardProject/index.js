/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import App from './App';
import {name as appName} from './app.json';
import {LoginScreen} from './screens/login_screen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import React from 'react';
import {HomeScreen} from './screens/home_screnn';
//AppRegistry.registerComponent(appName, () => App);

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

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
