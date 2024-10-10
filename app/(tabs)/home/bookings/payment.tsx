import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const BookingPaymentScreen = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Conditional rendering based on selected payment method
  const showCardDetails = paymentMethod === "card";

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="flex-grow bg-[#656565] py-10"
      >
        {/* Payment Title */}
        <Text className="text-center text-2xl font-bold mb-8 text-white">
          Payment
        </Text>
        {/* Payment Amount */}
        <Text className="text-center text-5xl font-bold text-white mb-8 mt-14">
          $120.00
        </Text>
        {/* Grey Background Section */}
        <View className="bg-gray-200 rounded-t-3xl px-6 py-16">
          {/* Payment Method Toggle */}
          <View className="flex-row justify-center mb-6 gap-2">
            <TouchableOpacity
              className={`flex-1 p-4 items-center rounded-lg ${
                paymentMethod === "card" ? "bg-orange-500" : "bg-gray-300"
              }`}
              onPress={() => setPaymentMethod("card")}
            >
              <Text
                className={`font-bold ${
                  paymentMethod === "card" ? "text-white" : "text-gray-700"
                }`}
              >
                Card Payment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-4 items-center rounded-lg ${
                paymentMethod === "cash" ? "bg-orange-500" : "bg-gray-300"
              }`}
              onPress={() => setPaymentMethod("cash")}
            >
              <Text
                className={`font-bold ${
                  paymentMethod === "cash" ? "text-white" : "text-gray-700"
                }`}
              >
                Cash Payment
              </Text>
            </TouchableOpacity>
          </View>
          {/* Card Payment Fields (only show when Card Payment is selected) */}
          {showCardDetails && (
            <View>
              <Text className="text-base font-semibold mb-2">Card Number</Text>
              <TextInput
                className="h-12 border border-gray-300 rounded-lg p-4 mb-4"
                placeholder="1234 8896 1145 0896"
                keyboardType="numeric"
              />
              <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-base font-semibold mb-2">
                    Expiry Date
                  </Text>
                  <TextInput
                    className="h-12 border border-gray-300 rounded-lg p-4"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-base font-semibold mb-2">CVV</Text>
                  <TextInput
                    className="h-12 border border-gray-300 rounded-lg p-4"
                    placeholder="204"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <Text className="text-base font-semibold mb-2">
                Card Holder Name
              </Text>
              <TextInput
                className="h-12 border border-gray-300 rounded-lg p-4 mb-4"
                placeholder="Ravishka Sathsara"
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* Pay Now Button fixed at the bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200">
        <TouchableOpacity
          className="bg-orange-500 py-4 rounded-lg items-center"
          onPress={() => router.push("/(tabs)/home/bookings/success")}
        >
          <Text className="text-white font-bold text-base">Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingPaymentScreen;
