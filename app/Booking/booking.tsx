// screens/BookingDetailsScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Button from "@/components/CustomButton";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

const BookingDetailsScreen = () => {
  const [selectedDate, setSelectedDate] = useState("14"); // example
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 py-8">
    <View className="flex flex-row items-center gap-1">
        <BackButton/>
          <Text className="text-2xl font-bold mb-4">New Appointment</Text>
    </View>

      <View className="flex-row justify-around mb-6">
        {["13", "14", "15", "16", "17"].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDate(day)}
            className={`px-4 py-2 rounded-lg ${
              selectedDate === day ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
          >
            <Text className="text-base font-bold">{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-base text-gray-500 mb-4">Available Times</Text>
      <View className="flex-row justify-between flex-wrap">
        {["09:00 AM", "10:00 AM", "11:00 AM", "10:30 AM"].map((time) => (
          <TouchableOpacity
            key={time}
            className="px-4 py-2 rounded-lg bg-gray-200 mb-4"
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Full Name"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      <TextInput
        placeholder="Age"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      
      <Button
        title="Set Appointment"
        onPress={() => router.push("/")}
      />
    </View>
  );
};

export default BookingDetailsScreen;
