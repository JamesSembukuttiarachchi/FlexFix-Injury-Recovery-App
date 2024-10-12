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
          Sprained Ankle - Task 2
        </Text>

        {/* Full width recovery plan image */}
        <Image
          source={{
            uri: "https://blog.eibe.co.uk/wp-content/uploads/2021/04/EIB_Blog_Calistenics_1.jpg",
          }}
          className="w-full h-64 rounded-lg mb-6"
        />

        {/* Overview/Description */}
        <Text className="text-lg font-semibold mb-4">3 points</Text>
        <Text className="text-base text-gray-700">
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when we are on a diet. Even so, in this area, especially the
          legs as a whole, you can reduce weight even if you don't use tools.
        </Text>
      </ScrollView>

      {/* START Button fixed at the bottom */}
      <View className="flex flex-row justify-between mx-2 items-center mb-2">
      <TouchableOpacity
          className="bg-gray-300 w-2/5 py-4 rounded-lg items-center"
          onPress={() => router.push("/(tabs)/home/recovery/saTask1")}
        >
          <Text className="text-black font-bold text-base">BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-500 w-2/5 py-4 rounded-lg items-center"
          onPress={() => router.push("/(tabs)/home/recovery/saTask3")}
        >
          <Text className="text-white font-bold text-base">NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default saTask1;
