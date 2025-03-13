import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNetwork } from "../../hooks/useNetwork";

export const NetworkStatus: React.FC = () => {
  const { isConnected, isLoading } = useNetwork();
  const insets = useSafeAreaInsets();

  if (isLoading || isConnected) return null;

  return (
    <Surface
      style={[styles.container, { paddingBottom: insets.bottom + 12 }]}
      elevation={2}
    >
      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.text}>
          No Internet Connection
        </Text>
        <Text variant="bodySmall" style={styles.subtext}>
          Using cached data
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#e8f5e9",
    paddingTop: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    borderTopWidth: 1,
    borderTopColor: "#c8e6c9",
  },
  content: {
    padding: 12,
  },
  text: {
    color: "#2e7d32",
    fontWeight: "600",
    textAlign: 'center',
  },
  subtext: {
    color: "#2e7d32",
    marginTop: 2,
    opacity: 0.8,
    textAlign: 'center',
  },
});
