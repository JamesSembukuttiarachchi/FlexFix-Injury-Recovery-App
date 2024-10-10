import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";
import ProgressCircle from "react-native-progress-circle";
import tracker from "@/assets/tracker.png";

const { width } = Dimensions.get("window");

const ProgressTracker = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    { key: "PieChart", type: "piechart" },
    { key: "UpcomingTasks", type: "tasks" },
  ];

  // Toggles the card expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderItem = ({ item }: any) => {
    if (item.type === "piechart") {
      return (
        <View
          style={{ width, alignItems: "center", justifyContent: "center" }}
          className="h-72"
        >
          {/* Center the pie chart */}
          <View className="flex items-center justify-center">
            <ProgressCircle
              percent={60}
              radius={60}
              borderWidth={8}
              color="#ffa500"
              shadowColor="#e5e5e5"
              bgColor="#fff"
            >
              <Text className="text-xl">60%</Text>
            </ProgressCircle>
            <Text className="mt-4 text-gray-500 text-sm">Current Task - Lorem Ipsum</Text>
          </View>
        </View>
      );
    } else if (item.type === "tasks") {
      return (
        <View
          style={{ width, alignItems: "center", justifyContent: "center" }}
          className="h-72 bg-gradient-to-b from-orange-300 to-orange-500 rounded-xl p-6"
        >
          <Text className="text-lg font-semibold text-black mb-4">Upcoming Tasks</Text>
          <View className="flex items-start space-y-2">
            <Text className="text-base text-white">• Lorem Ipsum asd loerevn</Text>
            <Text className="text-base text-white">• Lorem Ipsum asd loerevn</Text>
            <Text className="text-base text-white">• Lorem Ipsum asd loerevn</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="px-4">
        <View className="relative">
          <Image source={tracker} className="bottom-4 right-4" />
          <Text className="absolute py-10 text-3xl font-semibold text-black mb-4">
            Progress Tracker
          </Text>
        </View>

        <Text className="text-xl text-gray-600 mb-4">Ongoing Plan</Text>

        {/* First Card */}
        <TouchableOpacity onPress={toggleExpand}>
          <View className="rounded-lg bg-orange-500 p-4 mb-4 flex-row justify-between items-center">
            <Text className="text-lg text-white font-semibold">Sprained Ankle</Text>
            {isExpanded ? (
              <ChevronUpIcon color="white" size={24} />
            ) : (
              <ChevronDownIcon color="white" size={24} />
            )}
          </View>
        </TouchableOpacity>

        {/* Expanded View with Swipe */}
        {isExpanded && (
          <View className="bg-white rounded-lg p-6 mb-4 shadow-md">
            <FlatList
              data={data}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(item) => item.key}
              onScroll={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setCurrentIndex(index);
              }}
              contentContainerStyle={{ alignItems: "center" }}
            />
            <View className="flex-row justify-center mt-4">
              {data.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    currentIndex === index ? "bg-orange-600" : "bg-gray-400"
                  }`}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProgressTracker;
