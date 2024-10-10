import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import vector2 from "@/assets/Vector 2.png";

const appointments = [
  { id: "1", name: "Jason Momo", date: "12-04-2024", time: "07.00 PM" },
  { id: "2", name: "Jason Momo", date: "12-04-2024", time: "07.00 PM" },
  { id: "3", name: "Jason Momo", date: "12-04-2024", time: "07.00 PM" },
];

const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="relative mb-[70px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6">
          <View className="flex-row justify-center mb-6 gap-2">
            <TouchableOpacity
              className={`flex-1 p-3 items-center rounded-lg ${
                activeTab === "upcoming" ? "bg-gray-300" : ""
              }`}
              onPress={() => handleTabSwitch("upcoming")}
            >
              <Text
                className={`text-lg font-bold ${
                  activeTab === "upcoming" ? "text-black" : "text-gray-500"
                }`}
              >
                Upcoming Appointments
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 p-3 items-center rounded-lg"
              onPress={() => handleTabSwitch("past")}
            >
              <Text
                className={`text-lg font-bold ${
                  activeTab === "past" ? "text-black" : "text-gray-500"
                }`}
              >
                Past Appointments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Tabs */}
      </View>

      {/* Search Input */}
      <View className="px-4 py-2 mb-6">
        <View className="flex-row items-center bg-white rounded-lg p-3">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search"
            className="ml-2 flex-1"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Appointment List */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 mb-3 mx-4 rounded-lg shadow-lg">
            <View>
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-500">{item.date}</Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 px-4 py-2 rounded-lg"
              onPress={() => router.push("/")}
            >
              <Text className="text-white font-bold">View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AppointmentsScreen;
