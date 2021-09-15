/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {LoginScreen} from './screens/login-screen';
import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {HomeScreen} from './screens/home-screen';
import {client} from './features/apollo-client';

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
