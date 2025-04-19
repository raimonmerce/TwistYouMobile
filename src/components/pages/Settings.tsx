import React, { useState, useEffect } from "react";
import DropdownSelector from "../commons/DropdownSelector";
import Setting from "../commons/Setting"
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [lenguageTag, setLenguageTag] = useState(i18n.language);
  const [darkMode, setDarkMode] = useState(false);

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
    i18n.on("languageChanged", (lang) => {
      setLenguageTag(lang);
    });

    return () => {
      i18n.off("languageChanged");
    };
  }, [i18n]);

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
        setValue={setDarkMode}
        value={darkMode}
      />
    </>
  );
};

export default Settings;
