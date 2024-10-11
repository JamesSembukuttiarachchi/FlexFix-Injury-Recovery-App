import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import vector2 from "@/assets/Vector 2.png";

const prescriptions = [
  { id: "1", name: "Jason Momo", lastUpdated: "12-04-2024", time: "07.00 PM" },
  { id: "2", name: "John Smith", lastUpdated: "12-04-2024", time: "07.00 PM" },
];

const PrescriptionFinderScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6 top-8">
          <Text className="text-black text-2xl font-semibold">
            Prescription Finder
          </Text>
        </View>
      </View>

      {/* Search Input */}
      <View className="px-4 py-2 mb-6">
        <View className="flex-row items-center bg-white rounded-lg p-3">
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search"
            className="ml-2 flex-1"
            // value={searchText}
            // onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Prescription List */}
      <FlatList
        data={prescriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 mb-3 mx-4 rounded-lg shadow-lg">
            <View>
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-500">
                Last Updated {item.lastUpdated}
              </Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 px-4 py-2 rounded-lg"
              //   onPress={() => router.push(`/prescription/${item.id}`)}
            >
              <Text className="text-white font-bold">View</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-10 bg-orange-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        // onPress={() => router.push('/add-prescription')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PrescriptionFinderScreen;
