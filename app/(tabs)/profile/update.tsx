import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig"; // Adjust path to firebase config

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setEmail(data.email || currentUser.email);
          setPhoneNumber(data.phoneNumber || "");
          setLoading(false);
        }
      });
    }
  }, [currentUser]);

  const handleUpdate = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name,
        phoneNumber,
        email, // Optionally update email in the Auth system if needed
      });

    //   // Optionally update password
    //   if (password) {
    //     currentUser.updatePassword(password);
    //   }

      alert("Profile updated successfully");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-gray-700 py-6 rounded-b-3xl flex items-center relative">
        <Text className="text-white text-xl font-bold">Edit Profile</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-24 h-24 rounded-full border-4 border-white mt-4"
        />
        <Text className="text-white mt-2">Change Picture</Text>
      </View>

      {/* Form */}
      <View className="px-6 mt-4">
        {/* Username */}
        <Text className="text-gray-500 font-bold">Username</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Username"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Email */}
        <Text className="text-gray-500 font-bold mt-4">Email Id</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Phone Number */}
        <Text className="text-gray-500 font-bold mt-4">Phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Password */}
        <Text className="text-gray-500 font-bold mt-4">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-orange-500 py-4 rounded-lg mt-6 items-center"
        >
          <Text className="text-white text-lg font-bold">Update</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  );
}
