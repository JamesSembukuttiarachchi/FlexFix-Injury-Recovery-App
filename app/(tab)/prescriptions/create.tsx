import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust path to firebase config
import { useRouter } from "expo-router";
import vector2 from "@/assets/Vector 2.png";

export default function CreatePrescription() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (patientName && age && contact) {
      try {
        await addDoc(collection(db, "prescriptions"), {
          patientName,
          age,
          contact,
        });
        Alert.alert("Success", "Prescription saved successfully");
        router.push("/(tab)/prescriptions/"); // Redirect to home or any other page
      } catch (error) {
        Alert.alert("Error", "Failed to save prescription");
      }
    } else {
      Alert.alert("Validation Error", "Please fill all fields");
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="relative mb-[160px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6 top-8">
          <Text className="text-black text-2xl font-semibold">
            Prescription Finder
          </Text>
        </View>
      </View>

      <View className="flex justify-center items-center bg-gray-100 px-4">
        <View className="bg-gray-200 p-6 rounded-lg w-full max-w-md">
          {/* Patient's Name */}
          <Text className="text-lg font-bold mb-2">Patient's Name</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Enter patient name"
            value={patientName}
            onChangeText={setPatientName}
          />

          {/* Patient's Age */}
          <Text className="text-lg font-bold mb-2">Patient's Age</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Enter age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          {/* Contact Number */}
          <Text className="text-lg font-bold mb-2">Contact Number</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-6"
            placeholder="Enter contact number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-orange-500 rounded-lg py-3"
            onPress={handleSubmit}
          >
            <Text className="text-center text-white font-bold text-lg">
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
