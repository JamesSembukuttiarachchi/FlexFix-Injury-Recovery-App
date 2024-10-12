import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AppointmentsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen
        name="create"
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen
        name="update/[id]"
        options={{ headerShown: false }} // Home screen
      />
    </Stack>
  );
};

export default AppointmentsLayout;
