import React from "react";
import { SafeAreaView } from "react-native";
import { CardList } from "../components/CardList";
import { HomeScreenProps } from "../navigation/types";

export const CardListScreen: React.FC<HomeScreenProps> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} testID="card-list-container">
      <CardList />
    </SafeAreaView>
  );
};
