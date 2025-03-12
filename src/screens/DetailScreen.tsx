import React from "react";
import { SafeAreaView } from "react-native";
import { CardDetail } from "../components/CardDetail";
import type { DetailScreenProps } from "../navigation";

export const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  return (
    <SafeAreaView testID="detail-screen-container" style={{ flex: 1 }}>
      <CardDetail cardId={route.params.cardId} />
    </SafeAreaView>
  );
};
