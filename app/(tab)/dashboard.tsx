import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import vector2 from "@/assets/Vector 2.png";
import { router } from "expo-router";

const dashboard = () => {


  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      {/* <View className=" h-40 rounded-b-lg px-6 pt-10">
        <Image source={vector2} className="absolute"/>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-xl font-semibold">Hi, John!</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }} // replace with the real user image
            className="w-10 h-10 rounded-full"
          />
        </View>
        <Text className="text-white text-md">{currentDate}</Text>
      </View> */}
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6">
          <Text className="text-white text-xl font-semibold">Hi, John!</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }} // replace with the real user image
            className="w-10 h-10 rounded-full"
          />
        </View>
      </View>

      {/* Main Buttons */}
      <View className="flex-1 px-6 mt-8 space-y-6">
        <TouchableOpacity className="bg-orange-400 rounded-lg py-8" onPress={() => router.push("/(tab)/appointments")}>
          <Text className="text-center text-lg font-semibold text-black">
            View Appointments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-orange-400 rounded-lg py-8">
          <Text className="text-center text-lg font-semibold text-black">
            Prescriptions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default dashboard;
