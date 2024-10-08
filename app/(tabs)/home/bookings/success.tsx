import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import check from "@/assets/Group 168.png";
import { useRouter } from 'expo-router';

const success = () => {
    const router = useRouter();
  return (
    <View className="flex-1 p-16">
      <View className="flex flex-col items-center">
        <Image source={check}/>
        <Text className="text-center text-2xl font-bold mb-8 text-white">Your Payment is Successful</Text>
      </View>
      {/* Pay Now Button fixed at the bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4">
        <TouchableOpacity className="bg-orange-500 py-4 rounded-lg items-center" onPress={() => router.push("/(tabs)/home/")}>
          <Text className="text-white font-bold text-base">Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default success