import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth } from "../firebaseConfig"; // Import your Firebase config
import { updatePassword } from "firebase/auth";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import CustomTextInput from "@/components/CustomTextInput";

const SetNewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSetNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser; // Get the current user
      if (user) {
        await updatePassword(user, newPassword); // Update the password
        Alert.alert("Success", "Your password has been updated.");
        router.push("/login"); // Navigate to the login screen after success
      } else {
        setError("No user is currently logged in.");
      }
    } catch (err) {
      setError("Failed to set new password. Please try again.");
      console.error(err);
    }
  };

  return (
    <View className="flex mt-8 justify-center px-5 bg-white">
      <BackButton />
      <View className="mb-5">
        <Text className="flex text-2xl font-bold">Set a new password</Text>
        <Text className="text-base text-gray-500 mb-1">
          Create a new password. Ensure it differs from previous ones for
          security
        </Text>
      </View>

      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

      <Text className="text-base text-gray-500 mb-1">New Password</Text>
      <CustomTextInput
        secureTextEntry
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text className="text-base text-gray-500 mb-1">Confirm Password</Text>
      <CustomTextInput
        secureTextEntry
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        className="bg-orange-500 py-4 rounded-lg items-center"
        onPress={handleSetNewPassword}
      >
        <Text className="text-white text-lg font-bold">Set Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetNewPasswordScreen;
