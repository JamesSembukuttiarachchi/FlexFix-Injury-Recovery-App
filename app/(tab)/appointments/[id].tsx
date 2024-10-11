import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import vector2 from "@/assets/Vector 2.png";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AppointmentDetail = () => {
  const { id } = useLocalSearchParams(); // Get the dynamic `id` from the route
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAppointment = async () => {
        const docRef = doc(db, "appointments", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAppointment(docSnap.data());
        } else {
          console.log("No such appointment!");
        }
      };
      fetchAppointment();
    }
  }, [id]);

  if (!appointment) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6 top-8">
          <Text className="text-black text-2xl font-semibold">
            Appointment Details
          </Text>
        </View>
      </View>

      {/* Main Buttons */}
      <View className="flex-1 px-6 mt-3 space-y-6">
        <View className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Patient's Info */}
          <Text className="text-lg font-bold mb-4">Patient’s Info</Text>

          <Text className="mb-2">• Name - {appointment.fullName}</Text>
          <Text className="mb-2">• Age - {appointment.age}</Text>
          <Text className="mb-2">• Contact - 0710345432</Text>
          <Text className="mb-4">• Injury Type - {appointment.problem}</Text>

          {/* Buttons */}
          <TouchableOpacity className="bg-orange-500 py-3 rounded-lg mb-4">
            <Text className="text-center text-white font-bold">
              Update Prescription
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-orange-500 py-3 rounded-lg">
            <Text className="text-center text-white font-bold">
              View Prescription Records
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppointmentDetail;
