import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: "#fff" },
        headerTitleStyle: {
          fontFamily: "System",
          fontSize: 28,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "𝔹𝕒𝕤𝕖𝕓𝕒𝕝𝕝 ℂ𝕒𝕣𝕕𝕤",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "ℂ𝕒𝕣𝕕 𝔻𝕖𝕥𝕒𝕚𝕝𝕤",
          headerLargeTitle: false,
        }}
      />
    </Stack.Navigator>
  );
};
