import React from "react";
import { SafeAreaView } from "react-native";
import { CardList } from "../components/CardList";
import type { HomeScreenProps } from "../navigation";
import type { Card } from "../types/card";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CardList />
    </SafeAreaView>
  );
};
