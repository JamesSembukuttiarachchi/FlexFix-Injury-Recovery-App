import React, { useState } from "react";
import { View, TextInput, Text, ScrollView } from "react-native";
import RecoveryPlanCard from "@/components/PlanCard";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";

// Sample data for recovery plans
const sampleRecoveryPlans = [
  {
    id: "1",
    title: "Sprained Ankle",
    duration: "4 weeks",
    imageUrl: "https://blog.eibe.co.uk/wp-content/uploads/2021/04/EIB_Blog_Calistenics_1.jpg",
  },
  {
    id: "2",
    title: "Sports Injury Recovery",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/60",
  },
  {
    id: "3",
    title: "Chronic Pain Management",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/60",
  },
  {
    id: "4",
    title: "Cardiac Recovery Plan",
    duration: "12 weeks",
    imageUrl: "https://via.placeholder.com/60",
  },
  {
    id: "5",
    title: "Physical Therapy for Stroke",
    duration: "10 weeks",
    imageUrl: "https://via.placeholder.com/60",
  },
];

const RecoveryPlansScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter recovery plans based on the search query
  const filteredPlans = sampleRecoveryPlans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartButtonPress = (plan: any) => {
    // Navigate to recovery plan detail page and pass the plan details
    router.push({
      pathname: '/home/recovery/planDetails',
      params: {
        title: plan.title,
        imageUrl: plan.imageUrl,
        description: `A sprained ankle occurs when the ligaments that support the joint are stretched or torn, often due to twisting or rolling the foot inward or outward. This injury commonly affects the lateral ligaments on the outside of the ankle. Symptoms include pain, swelling, bruising, and difficulty bearing weight. While most ankle sprains are mild and heal with self-care, more severe cases might require medical intervention.`
      },
    });
  };

  return (

      <View className="flex-1 p-4 bg-white">
        <View className="flex flex-row items-center">
          <BackButton />
          <Text className="text-2xl font-bold mb-4">Recovery Plans</Text>
        </View>
        <TextInput
          className="h-10 border border-gray-300 rounded-lg p-2 shadow-lg mb-6"
          placeholder="Search recovery plans..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView>
        {/* You can now manually place multiple RecoveryPlanCard components as needed */}
        {filteredPlans.map((plan) => (
          <RecoveryPlanCard
            key={plan.id}
            title={plan.title}
            duration={plan.duration}
            imageUrl={plan.imageUrl}
            onStartPress={() => handleStartButtonPress(plan)}
          />
        ))}
        {/* Or if you want to add additional cards manually */}
        <RecoveryPlanCard
          title="Custom Plan"
          duration="5 weeks"
          imageUrl="https://via.placeholder.com/60"
          onStartPress={() => handleStartButtonPress("Custom Plan")}
        />
        </ScrollView>
      </View>


  );
};

export default RecoveryPlansScreen;
