import { Animated, Easing } from 'react-native';

export const fadeIn = (value: Animated.Value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
    easing: Easing.ease,
  });
};

export const slideUp = (value: Animated.Value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
    easing: Easing.out(Easing.cubic),
  });
};

export const scaleIn = (value: Animated.Value, duration = 300) => {
  return Animated.spring(value, {
    toValue: 1,
    useNativeDriver: true,
    damping: 15,
    mass: 1,
    stiffness: 150,
  });
};
