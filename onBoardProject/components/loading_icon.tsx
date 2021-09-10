import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoadingIcon = ({isIconAnimating}) => (
  <ActivityIndicator size="small" color='#ffffff' animating={isIconAnimating} />
);

export default LoadingIcon
