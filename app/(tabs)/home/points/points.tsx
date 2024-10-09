import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import header from "@/assets/header.png";

const PointsScreen = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Show confetti for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Confetti */}
      {showConfetti && (
        <ConfettiCannon
          count={150}
          origin={{ x: -1, y: 0 }} // Adjust the origin if needed
          fadeOut={true}
        />
      )}

      {/* Back Button */}
      <View className="relative">
        <Image source={header} className="right-2" />
        <View className="absolute p-4 flex-grow">
          <BackButton />
        </View>
      </View>

      {/* Points Header */}
      <View className="items-center mt-1">
        <Text className="text-2xl font-bold">Total Points</Text>
        <Text className="text-2xl font-bold mt-3 bg-orange-500 rounded-full">10 Points</Text>
      </View>

      {/* Points History Button */}
      <Pressable className="mt-10 mx-5 p-4 bg-orange-400 rounded-xl">
        <Text className="text-center text-white">Points History</Text>
      </Pressable>

      {/* Points Details */}
      <View className="mt-10">
        <Text className="text-xl font-bold ml-5">Points Details</Text>
        <View className="bg-orange-100 p-4 rounded-lg mt-3 mx-5">
          <Text className="text-green-600 text-sm">Up to 100 Points</Text>
          <Text className="text-black font-bold text-lg mt-2">
            Discount 30%
          </Text>
          <Text className="text-gray-600 text-sm">
            *Khusus untuk minimal pembelian Rp. 50.000
          </Text>
        </View>

        {/* Another Discount Item */}
        <View className="bg-orange-100 p-4 rounded-lg mt-3 mx-5">
          <Text className="text-green-600 text-sm">Up to 70 Points</Text>
          <Text className="text-black font-bold text-lg mt-2">
            Discount 10%
          </Text>
          <Text className="text-gray-600 text-sm">
            *Khusus untuk minimal pembelian Rp. 50.000
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PointsScreen;
