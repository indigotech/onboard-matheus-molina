import React, {Component, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {gql, useMutation} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';

export const HomeScreen: React.FC = props => {
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>WELCOME TO HOME SCREEN!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    backgroundColor: '#bfbfbf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 0.25,
    marginBottom: 60,
  },
});
