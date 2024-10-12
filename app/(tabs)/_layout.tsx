import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabsLayout = () => {

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FFA500" }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color }) => (
            <Fontisto name="pie-chart-1" size={24} color={color} />
          ),
        }}
        />
        <Tabs.Screen
        name="article"
        options={{
          tabBarLabel: "Articles",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="article" size={24} color={color} />
          ),
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        />

    </Tabs>
  );
};

export default TabsLayout;
