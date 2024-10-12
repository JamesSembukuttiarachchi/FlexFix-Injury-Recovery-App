import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";

const saTask1 = () => {
  const { title, imageUrl, description } = useLocalSearchParams();
  const planTitle = Array.isArray(title) ? title[0] : title;
  const planImageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  const planDescription = Array.isArray(description)
    ? description[0]
    : description;

  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4 flex-grow">
        {/* Back button */}
        <BackButton />

        {/* Recovery Plan Title */}
        <Text className="text-3xl font-bold text-center mb-6">
          Sprained Ankle - Task 1
        </Text>

        {/* Full width recovery plan image */}
        <Image
          source={{
            uri: "https://blog.eibe.co.uk/wp-content/uploads/2021/04/EIB_Blog_Calistenics_1.jpg",
          }}
          className="w-full h-64 rounded-lg mb-6"
        />

        {/* Overview/Description */}
        <Text className="text-lg font-semibold mb-4">Overview</Text>
        <Text className="text-base text-gray-700">
          - Rest: Minimize movement of the ankle to avoid further injury. Avoid
          walking or putting any weight on the affected foot. Use crutches if
          necessary to completely offload the ankle. - Elevation: Keep your
          ankle elevated above heart level as much as possible, especially in
          the first 48 hours. This helps to reduce swelling by improving
          circulation. - Protection: Use an ankle brace or compression wrap to
          stabilize the joint and provide support, preventing excessive movement
          that could cause further damage.
        </Text>
      </ScrollView>

      {/* START Button fixed at the bottom */}
      <View className="flex flex-row justify-between mx-2 items-center mb-2">
        <TouchableOpacity
          className="bg-gray-300 w-2/5 py-4 rounded-lg items-center"
          onPress={() => router.push("/(tabs)/home/recovery/planDetails")}
        >
          <Text className="text-black font-bold text-base">BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-500 w-2/5 py-4 rounded-lg items-center"
          onPress={() => router.push("/(tabs)/home/recovery/saTask2")}
        >
          <Text className="text-white font-bold text-base">NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default saTask1;
