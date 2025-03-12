import React, { useEffect, useRef, useMemo } from "react";
import { Animated, ViewStyle, Platform } from "react-native";
import { Card } from "react-native-paper";
import { fadeIn, scaleIn } from "../../utils/animations";

interface AnimatedCardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  index?: number;
  onPress?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = React.memo(
  ({ style, children, index = 0, onPress }) => {
    // Use refs to persist animation values
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    // Memoize animation style to prevent unnecessary style object creation
    const animatedStyle = useMemo(
      () => ({
        opacity,
        transform: [{ scale }],
      }),
      [opacity, scale]
    );

    useEffect(() => {
      // Optimize animation timing for different platforms
      const delay = Platform.OS === "ios" ? index * 80 : index * 100;

      // Use composite animations for better performance
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([fadeIn(opacity), scaleIn(scale)]),
      ]).start();
    }, [opacity, scale, index]);

    return (
      <Animated.View
        style={[animatedStyle, style]}
        // Enable hardware acceleration
        renderToHardwareTextureAndroid={true}
        needsOffscreenAlphaCompositing={Platform.OS === "android"}
      >
        <Card
          mode="elevated"
          elevation={2}
          onPress={onPress}
          style={Platform.select({
            ios: { shadowRadius: 2, shadowOpacity: 0.15 },
            android: { elevation: 2 },
          })}
        >
          {children}
        </Card>
      </Animated.View>
    );
  }
);

// Add display name for debugging
AnimatedCard.displayName = "AnimatedCard";
