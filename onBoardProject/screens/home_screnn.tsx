import React, {Component, useState} from 'react';

import {StyleSheet, Text, FlatList, View} from 'react-native';

import {gql, useQuery} from '@apollo/client';

const USER_QUERY = gql`
  query Users($offset: Int!, $limit: Int!) {
    users(pageInfo: {offset: $offset, limit: $limit}) {
      nodes {
        name
        email
        id
      }
    }
  }
`;

const UserCard = ({item}: any) => (
  <View style={styles.UserCardView}>
    <Text style={styles.UserName}>{item.name}</Text>
    <Text>{item.email}</Text>
  </View>
);

interface UsersQuery {
  users: UserNodes;
}
interface UserNodes {
  nodes: UserNodesItem[];
}
interface UserNodesItem {
  name: string;
  email: string;
  id: string;
}

export const HomeScreen: React.FC = props => {
  const {loading, error, data, fetchMore} = useQuery<UsersQuery>(USER_QUERY, {
    variables: {
      offset: 0,
      limit: 15,
    },
  });
  if (error) {
    console.log(error);
  }
  return (
    <View style={styles.ViewStyle}>
      <FlatList
        onEndReached={async () => {
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
