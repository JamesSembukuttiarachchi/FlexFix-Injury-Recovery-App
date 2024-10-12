import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} // Home screen
      />
      <Stack.Screen 
        name="bookings/bookPhy"
        options={{ headerShown: false}} // Booking screen
      />
      <Stack.Screen
        name="bookings/booking"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bookings/payment"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bookings/success"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery/plans"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery/planDetails"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="points/points"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery/saTask1"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery/saTask2"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="recovery/saTask3"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="prescriptions/prescriptions"
        options={{headerShown: false}}
      />
    </Stack>
  )
}

export default HomeLayout