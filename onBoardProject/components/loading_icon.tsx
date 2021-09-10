import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoadingIcon = ({isIconAnimating}:any) => (
  <ActivityIndicator size="small" color='#ffffff' animating={isIconAnimating} />
);

export default LoadingIcon
