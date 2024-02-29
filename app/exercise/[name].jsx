import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../../constants/graphqlClient";
import NewSetInput from "../../components/NewSetInput";

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      equipment
      instructions
      muscle
    }
  }
`;

const exercise = () => {
  const [seeMore, setSeeMore] = useState(false);
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => client.request(exerciseQuery, { name }),
  });
  const exercise = data?.exercises[0];
  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch exercises</Text>;
  function seeMoreHandler() {
    setSeeMore(!seeMore);
  }
  if (exercise) {
    return (
      <ScrollView style={styles.container}>
        <Stack.Screen
          options={{
            title: exercise.name,
          }}
        />
        <View style={styles.panel}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseSubtitle}>
            {exercise?.muscle?.toUpperCase()} |{" "}
            {exercise?.equipment?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.panel}>
          <Text
            style={styles.exerciseInstructions}
            numberOfLines={seeMore ? 0 : 3}
          >
            {exercise.instructions}
          </Text>
          <Pressable onPress={seeMoreHandler}>
            <Text style={styles.seeMore}>
              {seeMore ? "See less" : "See more"}
            </Text>
          </Pressable>
        </View>
        <NewSetInput />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
  exerciseInstructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  seeMore: {
    padding: 5,
    alignSelf: "center",
    fontWeight: "bold",
    color: "grey",
  },
});

export default exercise;
