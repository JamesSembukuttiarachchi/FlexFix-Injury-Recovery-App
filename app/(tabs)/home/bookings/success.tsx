import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import check from "@/assets/Group 168.png";
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon'; // Import ConfettiCannon

const Success = () => {
    const router = useRouter();
    const confettiRef = useRef(null); // Reference for triggering confetti

    // Trigger the confetti when the component mounts
    useEffect(() => {
        confettiRef.current?.start();
    }, []);

    return (
        <View className="flex-1 p-16">
            <View className="flex flex-col items-center">
                <Image source={check} />
                <Text className="text-center text-2xl font-bold mb-8 text-black">
                    Your Payment is Successful
                </Text>
            </View>

            {/* Confetti Animation */}
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }} // Position for confetti to start
              autoStart={true} // Auto-starts the animation
              fadeOut={true}  // Fades out confetti instead of disappearing abruptly
              ref={confettiRef} // Reference to control the confetti
            />

            {/* Back To Home Button fixed at the bottom */}
            <View className="absolute bottom-0 left-0 right-0 p-4">
                <TouchableOpacity
                    className="bg-orange-500 py-4 rounded-lg items-center"
                    onPress={() => router.push("/(tabs)/home/")}
                >
                    <Text className="text-white font-bold text-base">Back To Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Success;
