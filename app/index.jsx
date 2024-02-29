import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import exercises from "../assets/data/exercises.json";
import ExerciseListItem from "../components/ExerciseListItem";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={exercises}
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
