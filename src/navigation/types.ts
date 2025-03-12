import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "../types/card";

// Define the navigation stack parameter list
export type RootStackParamList = {
  Home: undefined;
  Detail: { cardId: string };
};

// Export screen props types for use in screen components
export type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, "Home">["navigation"];
export type DetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, "Detail">["navigation"];

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
