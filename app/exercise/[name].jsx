import { React, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
const exercise = () => {
  const [seeMore, setSeeMore] = useState(false);
  const params = useLocalSearchParams();
  const exercise = exercises.find((item) => item.name === params.name);
  if (!exercise) {
    return (
      <View>
        <Text>Exercise not found!</Text>
      </View>
    );
  }
  function seeMoreHandler() {
    setSeeMore(!seeMore);
  }
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
          {exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()}
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
    </ScrollView>
  );
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
    marginTop: 10,
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
