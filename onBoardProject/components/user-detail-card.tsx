import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DetailCardProps {
  title: string;
  icon: string;
  property: string;
}

export const DetailCard: React.FC<DetailCardProps> = ({
  title,
  icon,
  property,
}) => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.iconViewStyle}>
        <Icon name={icon} size={45}  />
      </View>
      <View>
        <Text style={styles.propertyTextStyle}>{property}</Text>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    padding: 8,
    marginBottom: 8,
  },
  iconViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    width:50,
  },
  iconStyle: {
    marginRight: 15,
  },
  propertyTextStyle:{
      fontWeight: '600',
      fontSize: 16
  },
});
