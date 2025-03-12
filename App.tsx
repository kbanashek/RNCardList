import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { RelayEnvironmentProvider } from "react-relay";
import { RootStack } from "./src/navigation";
import environment from "./src/relay/environment";
import { StatusBar } from "expo-status-bar";
// import { preloadImages } from "./src/assets/images";
import { Platform, UIManager } from "react-native";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <PaperProvider theme={MD3LightTheme}>
        <NavigationContainer>
          <RootStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </RelayEnvironmentProvider>
  );
}
