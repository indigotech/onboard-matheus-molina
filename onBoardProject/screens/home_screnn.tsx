import React, {Component, useState} from 'react';

import {StyleSheet, Text, FlatList, View} from 'react-native';

import {gql, useQuery} from '@apollo/client';

const USER_QUERY = gql`
  query {
    users {
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

export const HomeScreen: React.FC = props => {
  const {loading, error, data} = useQuery(USER_QUERY);

  return (
    <View style={styles.ViewStyle}>
      <FlatList
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
