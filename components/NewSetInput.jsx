import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { React, useState } from "react";

const NewSetInput = () => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  function onPressHandler() {
    console.log(reps, weight);
    //save data in the data base
    setReps("");
    setWeight("");
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={reps}
        keyboardType="number-pad"
        placeholder="Reps"
        onChangeText={setReps}
        style={styles.input}
      />
      <TextInput
        value={weight}
        keyboardType="number-pad"
        placeholder="Weight"
        onChangeText={setWeight}
        style={styles.input}
      />
      <Button title="add" onPress={onPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    gap: 10,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    borderColor: "gainsboro",
  },
});

export default NewSetInput;
