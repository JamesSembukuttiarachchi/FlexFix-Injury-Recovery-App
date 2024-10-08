import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";

const RecoveryPlanDetailsScreen = () => {
  const { title, imageUrl, description } = useLocalSearchParams();
  const planTitle = Array.isArray(title) ? title[0] : title;
  const planImageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  const planDescription = Array.isArray(description)
    ? description[0]
    : description;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4 flex-grow">
        {/* Back button */}
        <BackButton />

        {/* Recovery Plan Title */}
        <Text className="text-3xl font-bold text-center mb-6">{planTitle}</Text>

        {/* Full width recovery plan image */}
        <Image
          source={{ uri: planImageUrl }}
          className="w-full h-64 rounded-lg mb-6"
        />

        {/* Overview/Description */}
        <Text className="text-lg font-semibold mb-4">Overview</Text>
        <Text className="text-base text-gray-700">{planDescription}</Text>
      </ScrollView>

      {/* START Button fixed at the bottom */}
      <View className="p-4">
        <TouchableOpacity className="bg-orange-500 py-4 rounded-lg items-center">
          <Text className="text-white font-bold text-base">START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoveryPlanDetailsScreen;
