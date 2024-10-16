import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebaseConfig"; // Adjust path based on your setup
import { Picker } from "@react-native-picker/picker"; // Picker for selecting month and year
import moment from "moment"; // Moment.js for handling dates
//import { useAuth } from '../hooks/useAuth'; // Assuming you have a custom hook for fetching user

const AppointmentScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("DD")
  ); // Start with current day
  const [selectedMonth, setSelectedMonth] = useState<string>(
    moment().format("MM")
  ); // Start with current month
  const [selectedYear, setSelectedYear] = useState<string>(
    moment().format("YYYY")
  ); // Start with current year
  const [selectedTime, setSelectedTime] = useState<string>();
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [problem, setProblem] = useState<string>("");

  //const  user  = auth.currentUser; // Custom hook to get the current user
  const router = useRouter();

  // Calculate the days of the selected month, starting from the current day
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    const currentDate = moment(`${selectedYear}-${selectedMonth}-01`);
    const days = Array.from(
      { length: currentDate.daysInMonth() },
      (_, i) => i + 1
    );
    setDaysInMonth(days);
  }, [selectedMonth, selectedYear]);

  const submitAppointment = async () => {
    const user = auth.currentUser; // Get the current logged-in user

    if (!user) {
      Alert.alert("Error", "You need to be logged in to make an appointment");
      return;
    }

    if (!fullName || !age || !problem) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        userName: user.displayName || "Anonymous", // Save the logged-in user's name
        date: `${selectedYear}-${selectedMonth}-${selectedDate}`,
        time: selectedTime,
        fullName,
        age,
        gender,
        problem,
        userId: user.uid, // Save the user ID as well
        createdAt: new Date(),
      });
      //Alert.alert("Success", "Appointment set successfully");
      router.push("/(tabs)/home/bookings/payment"); // Navigate to the home screen after setting the appointment
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Failed to set appointment");
    }
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-white">
      <Text className="text-lg font-semibold text-center mb-4">
        New Appointment
      </Text>

      {/* Month and Year Selection */}
      <View className="flex-row justify-between items-center mb-4">
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {moment.months().map((month, index) => (
              <Picker.Item
                key={index}
                label={month}
                value={String(index + 1).padStart(2, "0")}
              />
            ))}
          </Picker>
        </View>

        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {[...Array(5).keys()].map((_, index) => {
              const year = moment().year() + index;
              return (
                <Picker.Item
                  key={year}
                  label={String(year)}
                  value={String(year)}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      {/* Horizontal Scroll for Dates */}
      <Text className="text-md mb-2">Select Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {daysInMonth.map((day) => (
          <TouchableOpacity
            key={day}
            className={`px-4 py-2 ${
              selectedDate === String(day) ? "bg-orange-400" : "bg-gray-200"
            } rounded mx-2`}
            onPress={() => setSelectedDate(String(day))}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Selection */}
      <Text className="text-md mb-4">Available Time</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {[
          "09:00 AM",
          "09:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "01:00 PM",
          "01:30 PM",
          "02:00 PM",
          "02:30 PM",
        ].map((time) => (
          <TouchableOpacity
            key={time}
            className={`px-3 py-2 mb-2 ${
              selectedTime === time ? "bg-orange-400" : "bg-gray-200"
            } rounded-lg`}
            onPress={() => setSelectedTime(time)}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Patient Details */}
      <Text className="text-md mb-2">Patient Details</Text>

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Gender Selection */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          className={`px-6 py-2 ${
            gender === "Male" ? "bg-orange-400" : "bg-gray-200"
          } rounded`}
          onPress={() => setGender("Male")}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-6 py-2 ${
            gender === "Female" ? "bg-orange-400" : "bg-gray-200"
          } rounded`}
          onPress={() => setGender("Female")}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholder="Write your problem"
        multiline
        numberOfLines={4}
        value={problem}
        onChangeText={setProblem}
      />

      {/* Set Appointment Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-2xl items-center mb-6 w-3/4 self-center"
        onPress={submitAppointment}
      >
        <Text className="text-white text-center font-semibold">
          Set Appointment
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentScreen;
