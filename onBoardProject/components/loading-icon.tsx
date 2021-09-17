import React from 'react';
import {ActivityIndicator} from 'react-native';

export interface LoadingIconProps {
  isIconAnimating: boolean;
  color: string;
  size: number | 'small' | 'large';
}

const LoadingIcon: React.FC<LoadingIconProps> = ({
  size,
  color,
  isIconAnimating,
}) => (
  <ActivityIndicator size={size} color={color} animating={isIconAnimating} />
);

export default LoadingIcon;
