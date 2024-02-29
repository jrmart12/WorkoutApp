import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { React, useState } from "react";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "../constants/graphqlClient";

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "AtlasCluster"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;
const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const queryClient = useQueryClient();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (newSet) => graphqlClient.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] });
    },
  });
  console.log("isPending", isPending, "isError", isError, error);
  const addSet = () => {
    const newSet = {
      username: "anonimo",
      exercise: exerciseName,
      reps: Number.parseInt(reps),
    };
    if (Number.parseFloat(weight)) {
      newSet.weight = Number.parseFloat(weight);
    }
    mutate(newSet);
  };

  function onPressHandler() {
    console.log(reps, weight);
    addSet();
    1;
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
