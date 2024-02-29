import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ExerciseListItem from "../components/ExerciseListItem";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../constants/graphqlClient";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => client.request(exercisesQuery),
  });
  console.log(data?.exercises);
  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch exercises</Text>;
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data?.exercises}
          keyExtractor={(exercise) => exercise.name}
          renderItem={({ item }) => <ExerciseListItem item={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  listContainer: {
    gap: 10,
  },
});
