import React, {Component, useState} from 'react';

import {StyleSheet, Text, FlatList, View} from 'react-native';

import {gql, useMutation} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';

const DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    username: 'Peter Parker',
    email: 'peterparker@marvel.com',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    username: 'Spider Man',
    email: 'spiderman@marvel.com',
  },
];

const UserCard = ({item}: any) => (
  <View style={styles.UserCardView}>
    <Text style={styles.UserName}>{item.username}</Text>
    <Text>{item.email}</Text>
  </View>
);

export const HomeScreen: React.FC = props => {
  return (
    <View style={styles.ViewStyle}>
      <FlatList
        data={DATA}
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
