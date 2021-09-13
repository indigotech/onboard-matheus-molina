import React from 'react';
import {ActivityIndicator} from 'react-native';

export interface LoadingIconProps {
  isIconAnimating: boolean;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ isIconAnimating }) => (
  <ActivityIndicator size="small" color="#ffffff" animating={isIconAnimating} />
);

export default LoadingIcon;
