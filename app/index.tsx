import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook
import CustomTextInput from "../components/CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore imports
import { auth, db } from "../firebaseConfig"; // Ensure db is imported from firebaseConfig

const SignUpScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter(); // Initialize router to navigate

  const handleSignUp = async () => {
    if (name === "" || email === "" || phoneNumber === "" || password === "") {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully:", user);

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created and user data saved.");
    } catch (error) {
      console.error("Error creating user or saving data:", error);
      Alert.alert("Error");
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-center text-2xl font-bold mb-8">
        Create an account
      </Text>

      <CustomTextInput
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        placeholder="Enter Your Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View className="mb-4">
        <View className="relative">
          <CustomTextInput
            placeholder="Enter Your Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
              className=""
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="bg-orange-500 py-4 rounded-lg items-center mb-6"
        onPress={handleSignUp}
      >
        <Text className="text-white font-bold text-base">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-2 text-gray-500">Or With</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <TouchableOpacity className="flex-row justify-center items-center border border-gray-300 py-4 rounded-lg mb-6">
        <FontAwesome name="google" size={24} color="" />
        <Text className="ml-2 font-bold text-base text-gray-500">Signup with Google</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500">
        Already have an account?{" "}
        <Text className="text-orange-500 font-bold" onPress={() => router.push("/login")}>Login</Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;
