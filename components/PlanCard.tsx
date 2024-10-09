import React from "react";
import { View, Image, TouchableOpacity, Text, Pressable } from "react-native";

interface PlanCardProps {
  title: string;
  duration: string;
  imageUrl: string;
  onStartPress: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  duration,
  imageUrl,
  onStartPress,
}) => {
  return (
    <View className="flex flex-row items-center bg-gray-100 p-4 rounded-2xl shadow-md mb-4">
      <Image source={{ uri: imageUrl }} className="w-16 h-16 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-medium">{title}</Text>

        <Text className="text-gray-600">{duration}</Text>
      </View>
      <TouchableOpacity
        className="bg-orange-500 rounded-lg px-4 py-2"
        onPress={onStartPress}
      >
        <Text className="text-white font-bold">Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanCard;
