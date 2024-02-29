import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { gql } from "graphql-request";
import client from "../constants/graphqlClient";
import { useQuery } from "@tanstack/react-query";
const setsQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;
export default function SetList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets"],
    queryFn: () => client.request(setsQuery),
  });
  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch exercises</Text>;
  console.log(data.sets.documents);
  return (
    <View>
      <FlatList
        data={data.sets.documents}
        keyExtractor={(set) => set._id}
        renderItem={({ item }) => (
          <Text
            style={{
              backgroundColor: "white",
              marginVertical: 5,
              padding: 10,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            {item.reps} X {item.weight}
          </Text>
        )}
      />
    </View>
  );
}
