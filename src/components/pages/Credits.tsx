import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity, Alert } from "react-native";
import { H4, H5, BaseText } from '../commons/Text';
import { useTranslation } from 'react-i18next';

const Credits: React.FC = () => {

  const { t } = useTranslation();

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Invalid link", "Cannot open this URL");
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 24,
      alignItems: "center",
    },
    title: {
      marginTop: 24,
      marginBottom: 24,
    },
    section: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 16,
      alignItems: "center",
    },
    footer: {
      marginTop: 32,
    },
  });

  return (
    <>
      <H4 style={styles.title}>{t('credits.credits')}</H4>

      <View style={styles.section}>
        <BaseText>{t('credits.programmer')}</BaseText>
        <TouchableOpacity onPress={() => openLink("https://github.com/raimonmerce")}>
          <H5>Ray @raimonmerce</H5>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <BaseText>{t('credits.artwork')}</BaseText>
        <TouchableOpacity onPress={() => openLink("https://www.instagram.com/zappeboy/")}>
          <H5>Zape @zappeboy</H5>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <BaseText>{t('credits.animation')}</BaseText>
        <TouchableOpacity onPress={() => openLink("https://www.instagram.com/pulebons/")}>
          <H5>Pule @pulebons</H5>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <BaseText>{t('credits.ui')}</BaseText>
        <TouchableOpacity onPress={() => openLink("https://www.linkedin.com/in/nilsolana/")}>
          <H5>Clara</H5>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <BaseText>{t('credits.trailer')}</BaseText>
        <TouchableOpacity onPress={() => openLink("https://www.linkedin.com/in/nilsolana/")}>
          <H5>Nil</H5>
        </TouchableOpacity>
      </View>

      <BaseText style={styles.footer}>{t('credits.thanks')}</BaseText>
    </>
  );
};

export default Credits;
