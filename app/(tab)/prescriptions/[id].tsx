import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // useSearchParams to get route params
import { doc, getDoc } from "firebase/firestore";
import vector2 from "@/assets/Vector 2.png";
import { db } from "@/firebaseConfig";

const PrescriptionList = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the patient ID from route params
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const docRef = doc(db, "prescriptions", id); // Fetch by patient id
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPrescription(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescription: ", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPrescription();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!prescription) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No prescription found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
       {/* Header */}
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6 top-8">
          <Text className="text-black text-2xl font-semibold">
            {prescription.patientName}'s Prescription
          </Text>
        </View>
      </View>
      <View className="p-6">
        <Text className="text-lg">Age: {prescription.age}</Text>
        <Text className="text-lg">Contact: {prescription.contact}</Text>
        {/* Displaying Prescription Details */}
        {prescription.prescriptionDetails && Object.keys(prescription.prescriptionDetails).length > 0 ? (
          Object.keys(prescription.prescriptionDetails).map((key) => {
            const { injuryType, description, updatedDate } = prescription.prescriptionDetails[key];
            return (
              <View key={key} className="mb-4 p-4 bg-white rounded shadow">
                <Text className="text-lg font-semibold">Injury Type: {injuryType}</Text>
                <Text className="text-lg">Description: {description}</Text>
                <Text className="text-lg">Updated Date: {updatedDate}</Text>
              </View>
            );
          })
        ) : (
          <Text className="text-lg">No prescription details available</Text>
        )}
      </View>
      <Pressable
        onPress={() => router.push(`/(tab)/prescriptions/update/${id}`)}
        className="bg-orange-500 p-4 rounded-full mx-4 mb-4"
      >
        <Text className="text-white text-center font-bold">Add New Prescription</Text>
      </Pressable>
    </View>
  );
};

export default PrescriptionList;
