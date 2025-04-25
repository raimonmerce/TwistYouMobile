import React from "react";
import { Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts } from '../../../styles/theme';

interface TextProps {
    children: React.ReactNode;
}
  
const H1: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.h1}>{children}</Text>
    );
};

const H3: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.h3}>{children}</Text>
    );
};

const H4: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.h4}>{children}</Text>
    );
};

const H5: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.h5}>{children}</Text>
    );
};

const BaseText: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.baseText}>{children}</Text>
    );
};

const H2: React.FC<TextProps> = ({ children }) => {
    return (
        <Text style={styles.h2}>{children}</Text>
    );
};

export {H1, H2, H3, H4, H5, BaseText};

const styles = StyleSheet.create({
    h1: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.h1,
        color: Colors.primary,
    },
    h2: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.h2,
        color: Colors.primary,
    },
    h3: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.h3,
        color: Colors.secondary,
    },
    h4: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.h4,
        color: Colors.text,
    },
    h5: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.h5,
        color: Colors.text,
    },
    baseText: {
        fontFamily: Fonts.base,
        fontSize: FontSizes.small,
        color: Colors.text,
    }
});

