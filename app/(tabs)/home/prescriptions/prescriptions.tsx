import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import vector2 from "@/assets/Vector 2.png";

const PrescriptionList = () => {
  const router = useRouter();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // State to store if the user is the owner
  const [userName, setUserName] = useState(null); // State to store the user's name

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user is currently logged in!");
        return;
      }

      const userId = user.uid; // Get the user's ID (uid)

      try {
        // Fetch the user's data from the 'users' collection
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name); // Assume the user's name is stored under 'name' in the 'users' collection

          // Fetch prescription data from 'prescriptions' collection
          const prescriptionDocRef = doc(
            db,
            "prescriptions",
            "b1DFGSWitTohMeiP0UaT"
          );
          const prescriptionDocSnap = await getDoc(prescriptionDocRef);

          if (prescriptionDocSnap.exists()) {
            const prescriptionData = prescriptionDocSnap.data();
            setPrescription(prescriptionData);

            // Compare the user's name with the prescription's patient name
            if (prescriptionData.patientName == "Minindi") {
              setIsOwner(true); // Set to true if the name matches
            } else {
              setIsOwner(false); // Set to false if the name doesn't match
            }
          } else {
            console.log("No prescription document found!");
          }
        } else {
          console.log("No user document found in 'users' collection!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user or prescription data: ", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
            Prescription's Record
          </Text>
        </View>
      </View>
      <View className="p-6">
        <Text className="text-lg">Age: {prescription.age}</Text>
        <Text className="text-lg">Contact: {prescription.contact}</Text>

        {/* Compare name and show a message based on ownership */}
        {isOwner ? (
          <Text className="text-green-500">
            You are viewing your own prescription.
          </Text>
        ) : (
          <Text className="text-red-500">
            You are viewing someone else's prescription.
          </Text>
        )}

        {/* Displaying Prescription Details */}
        {prescription.prescriptionDetails &&
        Object.keys(prescription.prescriptionDetails).length > 0 ? (
          Object.keys(prescription.prescriptionDetails).map((key) => {
            const { injuryType, description, updatedDate } =
              prescription.prescriptionDetails[key];
            return (
              <View key={key} className="mb-4 p-4 bg-white rounded shadow">
                <Text className="text-lg font-semibold">
                  Injury Type: {injuryType}
                </Text>
                <Text className="text-lg">Description: {description}</Text>
                <Text className="text-lg">Updated Date: {updatedDate}</Text>
              </View>
            );
          })
        ) : (
          <Text className="text-lg">No prescription details available</Text>
        )}
      </View>
    </View>
  );
};

export default PrescriptionList;
