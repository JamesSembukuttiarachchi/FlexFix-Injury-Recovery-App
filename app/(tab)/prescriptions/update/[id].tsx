import { View, Text, TextInput, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useRouter, useLocalSearchParams } from 'expo-router';
import vector2 from "@/assets/Vector 2.png";

const UpdatePrescription = () => {
  const [injuryType, setInjuryType] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the prescription ID

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const prescriptionRef = doc(db, 'prescriptions', id);
        const docSnap = await getDoc(prescriptionRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Assuming the details are stored in an object
          const latestKey = Object.keys(data.prescriptionDetails || {}).length; // Count the existing entries
          setInjuryType(data.prescriptionDetails[latestKey]?.injuryType || '');
          setDescription(data.prescriptionDetails[latestKey]?.description || '');
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      }
    };

    if (id) {
      fetchPrescriptionData();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
        const prescriptionRef = doc(db, 'prescriptions', id);

        // Fetch existing data to determine the next key
        const docSnap = await getDoc(prescriptionRef);
        const data = docSnap.exists() ? docSnap.data() : { prescriptionDetails: {} };

        // Get keys and filter to ensure they are valid numbers
        const currentKeys = Object.keys(data.prescriptionDetails)
            .filter(key => !isNaN(key)) // Filter to include only numeric keys
            .map(Number); // Convert keys to numbers

        const newKey = (currentKeys.length > 0) ? Math.max(...currentKeys) + 1 : 0; // Auto-increment key

        // Create a new entry with the new key
        const prescriptionData = {
            prescriptionDetails: {
                ...data.prescriptionDetails,
                [newKey]: {
                    injuryType,
                    description,
                    updatedDate: new Date().toLocaleDateString(),
                },
            },
        };

        await updateDoc(prescriptionRef, prescriptionData); // Save the object in a single field
        router.push('/(tab)/prescriptions/index'); // Navigate back after saving
    } catch (error) {
        console.error('Error saving prescription:', error);
    }
};


  return (
    <View className="flex-1 bg-gray-100">
        {/* Header */}
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="flex-row justify-between items-center p-6 top-8">
          <Text className="text-black text-2xl font-semibold">
            Update Prescription
          </Text>
        </View>
      </View>
      <View className="p-4 bg-gray-200 mx-5 py-10 rounded-lg">

          <TextInput
            placeholder="Injury Type"
            value={injuryType}
            onChangeText={setInjuryType}
            className="bg-white p-2 rounded mb-4"
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            className="bg-white p-2 rounded mb-4"
          />
          <Pressable
            onPress={handleSubmit}
            className="bg-orange-500 p-4 rounded-full"
          >
            <Text className="text-white text-center font-bold">Save Prescription</Text>
          </Pressable>
      </View>
    </View>
  );
};

export default UpdatePrescription;
