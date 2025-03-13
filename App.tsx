import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./src/relay/environment";
import { RootStack } from "./src/navigation";
import { preloadImages } from "./src/assets/images";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform, UIManager, View } from "react-native";
import { NetworkStatus } from "./src/components/shared/NetworkStatus";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Updates from "expo-updates";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RelayEnvironmentProvider environment={environment}>
        <PaperProvider theme={MD3LightTheme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStack />
              <NetworkStatus />
            </NavigationContainer>
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </PaperProvider>
      </RelayEnvironmentProvider>
    </GestureHandlerRootView>
  );
}
