import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomTextInput from "../components/CustomTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from '../firebaseConfig'; // Adjust path if needed
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Success', `Welcome back, ${user?.email}`);
        router.push("/home")
      })
      .catch((error) => {
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold text-center mb-5">Hi, Welcome Back! 👋</Text>

      <CustomTextInput
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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

         {/* Remember Me and Forgot Password */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text className="text-sm text-black">{rememberMe ? '☑' : '☐'} Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset link sent!')}>
          <Text className="text-sm text-orange-500" onPress={() => router.push("/forgotPassword")}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-orange-500 py-4 rounded-lg items-center mb-6"
        onPress={handleLogin}
      >
        <Text className="text-white font-bold text-base">Login</Text>
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
        Don't have an account?{" "}
        <Text
          className="text-orange-500 font-bold"
          onPress={() => router.push("/")} // Navigate to SignUp
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
