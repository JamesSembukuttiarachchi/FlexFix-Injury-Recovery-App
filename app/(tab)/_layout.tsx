import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig"; // Ensure the correct path to your firebaseConfig

const TabsLayout = () => {
  const [userType, setUserType] = useState<
    "patient" | "physiotherapist" | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const user = auth.currentUser; // Get the current user from Firebase Auth
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid)); // Get user document from Firestore
          if (userDoc.exists()) {
            const userTypeFromDB = userDoc.data().userType; // Assuming userType field exists
            console.log("User Type:", userTypeFromDB); // Log the user type for debugging
            setUserType(userTypeFromDB);
          } else {
            console.warn("User document does not exist");
          }
        } else {
          console.warn("No user is currently logged in");
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();
  }, []);

  // Show a loading indicator while fetching user type
  if (loading) {
    return <ActivityIndicator size="large" color="#BB32FF" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#BB32FF" }}
    >
      <Tabs.Screen
        name="dashboard" // Ensure there's a corresponding screen component
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Feather name="briefcase" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments" // Ensure there's a corresponding screen component
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="wpforms" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="prescriptions" // Ensure there's a corresponding screen component
        options={{
          tabBarLabel: "Prescriptions",
          tabBarIcon: ({ color }) => (
            <AntDesign name="filetext1" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Ensure there's a corresponding screen component
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
