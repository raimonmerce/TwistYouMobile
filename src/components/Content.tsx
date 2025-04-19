import React from 'react';
import { View } from 'react-native';

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <View>{children}</View>;
};

export default Content;
