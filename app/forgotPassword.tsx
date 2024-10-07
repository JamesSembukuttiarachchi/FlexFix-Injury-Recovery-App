import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebaseConfig"; // Import your Firebase config
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "expo-router";
import amico from "../assets/amico.png";
import CustomTextInput from "@/components/CustomTextInput";
import BackButton from "@/components/BackButton";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      // Navigate to Verify Code screen after successful email send
      router.push("/verifyCode");
    } catch (err) {
      setError("Failed to send reset email. Please check your email.");
      console.error(err);
    }
  };

  return (
    <View className="flex mt-8 justify-center px-5 bg-white">
      <BackButton />
      <Image
        source={amico} // Replace with your illustration's URI
        className="w-full h-48 mb-20"
        resizeMode="contain"
      />
      <View className="mb-5">
        <Text className="flex text-2xl font-bold">Forgot Password</Text>
        <Text className="text-base text-gray-500 mb-1">
          Please enter your email to reset the password
        </Text>
      </View>

      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

      <Text className="text-base text-gray-500 mb-1 font-semibold">
        Your Email
      </Text>

      <CustomTextInput
        placeholder="john@gmail.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        className="bg-orange-500 py-4 rounded-lg items-center"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-lg font-bold">Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
