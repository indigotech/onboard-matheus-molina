import React, {Component, useState} from 'react';

import {StyleSheet, Text, FlatList, View} from 'react-native';

import {useQuery} from '@apollo/client';

import {
  USER_QUERY,
  UsersQuery,
  UserQueryVariables,
} from '../features/apollo-home';
import { AddUserButton } from '../components/add-user-button';

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
  return (
    <View style={styles.ViewStyle}>
      <AddUserButton componentId={props.componentId}/>
      <FlatList
        onEndReached={async () => {
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
        }}
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
