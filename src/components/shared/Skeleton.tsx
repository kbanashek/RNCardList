import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle, Platform } from "react-native";
import { useTheme } from "react-native-paper";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  style?: ViewStyle;
  borderRadius?: number;
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({
  width = "100%",
  height = 20,
  style,
  borderRadius = 4,
}) => {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
          backgroundColor: theme.colors.surfaceVariant,
        },
        style,
      ]}
      renderToHardwareTextureAndroid={true}
      needsOffscreenAlphaCompositing={Platform.OS === "android"}
    />
  );
});

Skeleton.displayName = 'Skeleton';

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});
