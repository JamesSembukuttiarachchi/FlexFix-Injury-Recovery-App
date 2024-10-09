import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";
import ProgressCircle from "react-native-progress-circle";
import { useRouter } from "expo-router";
import tracker from "@/assets/tracker.png";

const ProgressTracker = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggles the card expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="px-4">
        <View className="relative">
          <Image source={tracker} className="bottom-4 right-4"/>
        <Text className="absolute py-10 text-3xl font-semibold text-black mb-4">
          Progress Tracker
        </Text>
        </View>

        <Text className="text-xl text-gray-600 mb-4">Ongoing Plan</Text>

        {/* First Card */}
        <TouchableOpacity onPress={toggleExpand}>
          <View className="rounded-lg bg-orange-500 p-4 mb-4 flex-row justify-between items-center">
            <Text className="text-lg text-white font-semibold">
              Sprained Ankle
            </Text>
            {isExpanded ? (
              <ChevronUpIcon color="white" size={24} />
            ) : (
              <ChevronDownIcon color="white" size={24} />
            )}
          </View>
        </TouchableOpacity>

        {/* Expanded View */}
        {isExpanded && (
          <View className="bg-white rounded-lg p-6 mb-4 shadow-md">
            <View className="flex justify-center items-center mb-4">
              {/* Circular progress bar */}
              <ProgressCircle
                percent={60}
                radius={60}
                borderWidth={8}
                color="#ffa500"
                shadowColor="#e5Eee5"
                bgColor="#fff"
              >
                <Text className="text-xl">60%</Text>
              </ProgressCircle>
              <Text className="mt-4 text-gray-500 text-sm">
                Current Task - Lorem Ipsum
              </Text>
            </View>
          </View>
        )}

        {/* Second Card */}
        <TouchableOpacity onPress={toggleExpand}>
          <View className="rounded-lg bg-orange-500 p-4 flex-row justify-between items-center">
            <Text className="text-lg text-white font-semibold">
              Sprained Ankle
            </Text>
            {isExpanded ? (
              <ChevronUpIcon color="white" size={24} />
            ) : (
              <ChevronDownIcon color="white" size={24} />
            )}
          </View>
        </TouchableOpacity>

        {/* Expanded View */}
        {isExpanded && (
          <View className="bg-white rounded-lg p-6 mt-4 shadow-md">
            <View className="flex justify-center items-center mb-4">
              {/* Circular progress bar */}
              <ProgressCircle
                percent={60}
                radius={60}
                borderWidth={8}
                color="#FFA500"
                shadowColor="#E5E5E5"
                bgColor="#fff"
              >
                <Text className="text-xl">60%</Text>
              </ProgressCircle>
              <Text className="mt-4 text-gray-500 text-sm">
                Current Task - Lorem Ipsum
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProgressTracker;
