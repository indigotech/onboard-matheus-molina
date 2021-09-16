/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {LoginScreen} from './screens/login-screen';
import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {HomeScreen} from './screens/home-screen';
import {client} from './features/apollo-client';
import {AddUserButton} from './components/add-user-button';
import {AddUserScreen} from './screens/add-user-screen';
import {UserDetailsScreen} from './screens/user-details';

Navigation.registerComponent(
  'LoginPage',
  () => props =>
    (
      <ApolloProvider client={client}>
        <LoginScreen {...props} />
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

Navigation.registerComponent(
  'AddUserPage',
  () => props =>
    (
      <ApolloProvider client={client}>
        <AddUserScreen {...props} />
      </ApolloProvider>
    ),
  () => AddUserScreen,
);

Navigation.registerComponent('AddUserButton', () => AddUserButton);

Navigation.registerComponent(
  'UserDetailsPage',
  () => props =>
    (
      <ApolloProvider client={client}>
        <UserDetailsScreen {...props} />
      </ApolloProvider>
    ),
  () => UserDetailsScreen,
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
