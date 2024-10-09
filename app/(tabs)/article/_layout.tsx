import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ArticleLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen
        name="articleDetails"
        options={{ headerShown: false }} // Home screen
      />
    </Stack>
  );
};

export default ArticleLayout;
