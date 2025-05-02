import React from "react";
import { Text, TextStyle } from 'react-native';
import { FontSizes, Fonts } from '../../../styles/theme';
import { useTheme } from '../ThemeProvider';

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const H1: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
        <Text 
            style={[{
                fontFamily: Fonts.base,
                fontSize: FontSizes.h1,
                color: colors.primary,
            }, style]}
        >
            {children}
        </Text>
    )
};

const H2: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
  <Text
    style={[{
        fontFamily: Fonts.base,
        fontSize: FontSizes.h2,
        color: colors.primary,
    }, style]}
  >
    {children}
  </Text>
)};

const H3: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
    <Text
        style={[{
            fontFamily: Fonts.base,
            fontSize: FontSizes.h3,
            color: colors.secondary,
        }, style]}
    >
        {children}
    </Text>
)};

const H4: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
    <Text 
        style={[{
            fontFamily: Fonts.base,
            fontSize: FontSizes.h4,
            color: colors.text,
        }, style]}
    >
        {children}
    </Text>
)};

const H5: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
    <Text
        style={[{
            fontFamily: Fonts.base,
            fontSize: FontSizes.h5,
            color: colors.text,
        }, style]}
    >
        {children}
    </Text>
)};

const BaseText: React.FC<TextProps> = ({ children, style }) => {
    const { colors } = useTheme();
    return (
    <Text
        style={[{
            fontFamily: Fonts.base,
            fontSize: FontSizes.small,
            color: colors.text,
        }, style]}
    >
        {children}
    </Text>
)};

export { H1, H2, H3, H4, H5, BaseText };
