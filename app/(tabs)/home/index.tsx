import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import vector2 from "@/assets/Vector 2.png";
import recommended2 from "@/assets/Recommended 2.png";
import { useRouter, useNavigation } from "expo-router";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore functions

interface UserData {
  name: string;
  isAdmin?: boolean; // Optional in case it's not always there
}


const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Firebase User or null
  const [username, setUsername] = useState<string>("");
  const auth = getAuth();
  const db = getFirestore(); // Firestore instance

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in

        let displayName = currentUser.displayName || "";
        try {
          // Fetch admin status from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            displayName = userData.name || displayName; // Use name from Firestore if available
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

        setUsername(displayName);
      } else {
        // User is logged out
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);


  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="relative mb-[180px]">
        <Image source={vector2} className="absolute" />
        <View className="rounded-b-lg p-4 flex-row justify-between items-center top-[50px]">
          <Text className="text-black text-2xl font-bold">
            Welcome {username}
          </Text>
          <View className="flex-row items-center">
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/000000/star.png",
              }}
              className="w-6 h-6"
            />
            <Text className="text-white ml-2">10 pts</Text>
          </View>
        </View>
      </View>

      {/* Main Buttons Section */}
      <View className="p-4">
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity className="flex-1 bg-orange-200 p-4 rounded-lg items-center justify-center mr-2" onPress={() => router.push('/home/bookings/bookPhy')}>
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/000000/physician-female.png",
              }}
              className="w-12 h-12 mb-2"
            />
            <Text className="text-black font-bold">Book a Physio</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-orange-200 p-4 rounded-lg items-center justify-center ml-2" onPress={() => router.push('/home/recovery/plans')}>
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/000000/yoga.png",
              }}
              className="w-12 h-12 mb-2"
            />
            <Text className="text-black font-bold">Recovery Plans</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 bg-orange-200 p-4 rounded-lg items-center justify-center mr-2">
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/000000/prescription.png",
              }}
              className="w-12 h-12 mb-2"
            />
            <Text className="text-black font-bold">Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-purple-200 p-4 rounded-lg items-center justify-center ml-2">
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/000000/book.png",
              }}
              className="w-12 h-12 mb-2"
            />
            <Text className="text-black font-bold">The Miracle Morning</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start Recovery Section */}
      <TouchableOpacity className="bg-green-200  rounded-lg m-4 items-center justify-center">
        <Image source={recommended2} className="" />
        {/* <Text className="text-black font-bold">Start a Recovery Session</Text>
        <Text className="text-black">Short, guided sessions</Text>
        <Text className="bg-blue-500 text-white p-2 rounded-lg mt-2">
          Start
        </Text> */}
      </TouchableOpacity>

      {/* Bottom Navigation Bar
      <View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="items-center">
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/000000/home.png' }}
            className="w-6 h-6"
          />
          <Text className="text-gray-500">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/000000/progress-bar.png' }}
            className="w-6 h-6"
          />
          <Text className="text-gray-500">Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/000000/read.png' }}
            className="w-6 h-6"
          />
          <Text className="text-gray-500">Articles</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/000000/user.png' }}
            className="w-6 h-6"
          />
          <Text className="text-gray-500">Profile</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Home;
