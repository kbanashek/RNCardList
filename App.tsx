import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { RelayEnvironmentProvider } from "react-relay";
import { RootStack } from "./src/navigation";
import environment from "./src/relay/environment";
import { StatusBar } from "expo-status-bar";
import { preloadImages } from "./src/assets/images";
import { Platform, UIManager, View } from "react-native";
import { NetworkStatus } from "./src/components/shared/NetworkStatus";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <SafeAreaProvider>
        <PaperProvider theme={MD3LightTheme}>
          <View style={{ flex: 1 }}>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
            <NetworkStatus />
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </RelayEnvironmentProvider>
  );
}
