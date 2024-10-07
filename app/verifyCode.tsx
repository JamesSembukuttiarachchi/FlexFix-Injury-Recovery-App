import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import pana from "../assets/pana.png";
import BackButton from "@/components/BackButton";

const VerifyCodeScreen = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyCode = () => {
    console.log("Entered OTP:", otp.join(""));
    // Navigate to the next screen (e.g., Set New Password) after verification
    router.push("/setPassword");
  };

  return (
    <View className="flex mt-8 justify-center px-5 bg-white">
      <BackButton />
      <Image
        source={pana} // Replace with your illustration's URI
        className="w-full h-48 mb-20"
        resizeMode="contain"
      />

      <Text className="text-2xl font-bold text-center mb-5">
        Check your email
      </Text>

      <Text className="text-base text-gray-500 mb-5">
        We sent a reset link to contact@dscode.com. Enter the 5-digit code from
        your email.
      </Text>

      <View className="flex-row justify-between mb-5">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-orange-500 py-4 rounded-lg items-center"
        onPress={handleVerifyCode}
      >
        <Text className="text-white text-lg font-bold">Verify Code</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-5">
        <Text className="text-center text-orange-500 text-lg font-bold">
          Resend email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyCodeScreen;
