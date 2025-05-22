import React, { useState, useEffect } from "react";
import DropdownSelector from "../commons/DropdownSelector";
import Setting from "../commons/Setting"
import { useTranslation } from "react-i18next";
import { useTheme } from '../ThemeProvider';
import { GameSettings } from "../../types";

interface SettingsProps {
  setSettings: (value: GameSettings) => void;
  settings: GameSettings;
}

const Settings: React.FC<SettingsProps> = ({
  setSettings,
  settings
}) => {
  const { t, i18n } = useTranslation();

  const [lenguageTag, setLenguageTag] = useState(i18n.language);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const lenguages = [
    { value: "es", label: t("settings.spanish", "Español") },
    { value: "en", label: t("settings.english", "English") },
    { value: "cat", label: t("settings.catalan", "Catalan") }
  ];

  const handleLenguageChange = (value: string) => {
    setLenguageTag(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setLenguageTag(i18n.language);
  }, [i18n.language]); 

  return (
    <>
      <DropdownSelector
        name={t('settings.language')}
        description={t('settings.languageDescription')}
        items={lenguages}
        onChange={handleLenguageChange}
        initialValue={lenguageTag}
      />
      <Setting
        name={t("settings.darkMode", "Modo oscuro")}
        description={t('settings.darkModeDescription')}
        setValue={() => toggleDarkMode()}
        value={isDarkMode}
      />
      <Setting
        name={t("settings.eighteen", "Opciones +18")}
        description={t('settings.eighteenDescription')}
        setValue={(value: boolean) => setSettings({
          ...settings,
          ["adultMode"]: value,
        })}
        value={settings.adultMode}
      />
    </>
  );
};

export default Settings;
