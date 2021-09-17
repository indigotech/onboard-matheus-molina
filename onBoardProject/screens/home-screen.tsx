import React from 'react';

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

import {useQuery} from '@apollo/client';

import {
  USER_QUERY,
  UsersQuery,
  UserQueryVariables,
  UserNodesItem,
} from '../features/apollo-home';
import {Navigation} from 'react-native-navigation';
import {UserCard} from '../components/user-card';

interface HomeScreenProps {
  componentId: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = props => {
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

  const handleUserCardTap = (user: UserNodesItem) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserDetailsPage',
        passProps: {
          id: user.id,
        },
      },
    });
  };

  const renderItem: ListRenderItem<UserNodesItem> = ({item}) => {
    return <UserCard user={item} onTap={() => handleUserCardTap(item)} />;
  };

  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, HomeOptions(props.componentId));
  }, []);

  return (
    <View style={styles.ViewStyle}>
      <FlatList
        onEndReached={handleEndReached}
        data={data?.users.nodes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

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
                component: AddUserPageComponent,
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
