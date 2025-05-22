import React from "react";
import Setting from "../commons/Setting"
import DropdownSelector from "../commons/DropdownSelector"
import { useTranslation } from "react-i18next";
import { MAX_PLAYERS } from "../../constants";
import { GameSettings } from "../../types";

interface HomeScreenProps {
  setNumberPlayers: (value: number) => void;
  numberPlayers: number;
  setSettings: (value: GameSettings) => void;
  settings: GameSettings;
}

const HomeScreen: React.FC<HomeScreenProps>  = ({
  setNumberPlayers,
  numberPlayers,
  setSettings,
  settings,
}) => {
  const { t } = useTranslation();

  const generateItems = (MAX_PLAYERS: number) => {
    const items = [];
    for (let i = 2; i <= MAX_PLAYERS; i++) {
      items.push({ value: i.toString(), label: `${i}`});
    }
    return items;
  };

  const items = generateItems(MAX_PLAYERS);

  const handleChangeMaxPlayers = (value: string) => {
    setNumberPlayers(Number(value));
  }

  const handleToggle = (key: keyof GameSettings, value: boolean) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <>
      <Setting 
        name={t('main.color', 'Color')}
        description={t('main.colorDescription')}  
        setValue={(value) => handleToggle("colorMode", value)} 
        value={settings.colorMode} 
      />
      {settings.adultMode && <>
        <Setting 
          name={t('main.alcohol', 'Alcohol')}
          description={t('main.alcoholDescription')}  
          setValue={(value) => handleToggle("alcoholMode", value)} 
          value={settings.alcoholMode} 
        />
        <Setting 
          name={t('main.extreme', 'Extremo')}
          description={t('main.extremeDescription')}  
          setValue={(value) => handleToggle("extremoMode", value)} 
          value={settings.extremoMode} 
        />
      </>}
      <Setting 
        name={t('main.master', 'Master')}
        description={t('main.masterDescription')}  
        setValue={(value) => handleToggle("masterMode", value)} 
        value={settings.masterMode} 
      />
      <DropdownSelector 
        name={t('main.players')}
        description={t('main.playersDescription')}
        items={items} 
        onChange={handleChangeMaxPlayers} 
        initialValue={numberPlayers.toString()}
      />
    </>
  );
};

export default HomeScreen;