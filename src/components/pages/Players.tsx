import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Colors, FontSizes, Fonts} from '../../../styles/theme';

interface PlayersProps {
  setPlayers: (value: string[]) => void;
  players: string[];
}

const Players: React.FC<PlayersProps> = ({ players, setPlayers }) => {
  const handleInputChange = (value: string, index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {players.map((player, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Player ${index + 1}`}
              value={player}
              onChangeText={(value) => handleInputChange(value, index)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    maxHeight: 525,
    width: '100%',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.input,
    fontFamily: Fonts.base,
    fontSize: FontSizes.small,
    color: Colors.text,
  },
});

export default Players;
