import {useQuery} from '@apollo/client';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import LoadingIcon from '../components/loading-icon';
import {DetailCard} from '../components/user-detail-card';
import {GET_USER_QUERY} from '../features/apollo-user-detail';

interface UserDetailScreenProps {
  id: string;
}

export const UserDetailsScreen: React.FC<UserDetailScreenProps> = props => {
  const {loading, data, error} = useQuery(GET_USER_QUERY, {
    variables: {id: props.id},
    onError: error => Alert.alert(error.message),
  });
  if (loading) {
    return <LoadingIcon isIconAnimating={loading} />;
  } else {
    return (
      <View>
        <DetailCard title={data?.user.name} icon="user" property="Name" />
        <DetailCard title={data?.user.email} icon="envelope" property="Email" />
        <DetailCard title={data?.user.phone} icon="phone" property="Phone" />
        <DetailCard
          title={data?.user.birthDate}
          icon="calendar-o"
          property="Birth Date"
        />
        <DetailCard title={data?.user.role} icon="id-badge" property="Role" />
      </View>
    );
  }
};
