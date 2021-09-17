import React, {Component, useState} from 'react';

import {StyleSheet, Text, FlatList, View} from 'react-native';

import {useQuery} from '@apollo/client';

import {
  USER_QUERY,
  UsersQuery,
  UserQueryVariables,
} from '../features/apollo-home';
import {AddUserButton} from '../components/add-user-button';
import {Navigation} from 'react-native-navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserCard = ({item}: {item: User}) => (
  <View style={styles.UserCardView}>
    <Text style={styles.UserName}>{item.name}</Text>
    <Text>{item.email}</Text>
  </View>
);

export const HomeScreen: React.FC = props => {
  const {loading, error, data, fetchMore} = useQuery<
    UsersQuery,
    UserQueryVariables
  >(USER_QUERY, {
    variables: {
      offset: 0,
      limit: 15,
    },
  });

  const handleEndReached = async () => {
    if (data?.users.pageInfo.hasNextPage) {
      await fetchMore({
        variables: {
          offset: data?.users.nodes.length,
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          const newEntries = fetchMoreResult?.users.nodes ?? [];
          return {
            ...previousResult,
            users: {
              ...previousResult.users,
              nodes: [...previousResult.users.nodes, ...newEntries],
            },
          };
        },
      });
    }
  };
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, HomeOptions(props.componentId));
  }, []);

  return (
    <View style={styles.ViewStyle}>
      <FlatList
        onEndReached={handleEndReached}
        data={data?.users.nodes}
        renderItem={UserCard}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    backgroundColor: '#bfbfbf',
  },
  UserCardView: {
    backgroundColor: '#fbfbfb',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#8c8c8c',
  },
  UserName: {
    fontSize: 18,
    letterSpacing: 0.25,
    fontWeight: '300',
    color: '#171717',
    marginBottom: 6,
  },
});

const HomeOptions = (componentId: string) => ({
  topBar: {
    title: {
      text: 'Home',
    },
    rightButtons: [
      {
        id: 'AddButton',
        component: {
          name: 'AddUserButton',
          passProps: {
            onTap: () => {
              Navigation.push(componentId, {
                component: AddUserPageComponent
              });
            },
          },
        },
      },
    ],
  },
});

const AddUserPageComponent = {
  name: 'AddUserPage',
  options: {
    topBar: {
      title: {
        text: 'SignUp',
      },
    },
  },
};
