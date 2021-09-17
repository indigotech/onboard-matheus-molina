import React from 'react';

import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onTap: () => void;
}

export const UserCard = (props: UserCardProps) => {
  return (
    <TouchableOpacity onPress={props.onTap}>
      <View style={styles.UserCardView}>
        <Text style={styles.UserName}>{props.user.name}</Text>
        <Text>{props.user.email}</Text>
      </View>
    </TouchableOpacity>
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