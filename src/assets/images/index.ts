import { Image, ImageSourcePropType } from "react-native";

export const Images = {
  griffey: require("./griffey.jpg"),
  jeter: require("./jeter.jpg"),
  sosa: require("./sosa.jpg"),
  jones: require("./jones.jpg"),
  ripken: require("./ripken.jpg"),
} as const;

// Define valid image keys
export type CardImageKey = keyof typeof Images;

// Preload all images
export const preloadImages = () => {
  Object.values(Images).forEach((image) => {
    if (typeof image === "number") {
      Image.prefetch(Image.resolveAssetSource(image).uri);
    }
  });
};

// Cache for resolved image sources
const imageCache: Record<CardImageKey, ImageSourcePropType> = {} as Record<
  CardImageKey,
  ImageSourcePropType
>;

// Helper function to get image source with caching
export const getImage = (key: CardImageKey | string): ImageSourcePropType => {
  // Check if the key exists in Images, otherwise use default
  const validKey = Object.keys(Images).includes(key) ? key as CardImageKey : "griffey";

  // Return cached resolved source if available
  if (imageCache[validKey]) {
    return imageCache[validKey];
  }

  // Resolve and cache the source
  const source = Images[validKey];
  if (source) {
    imageCache[validKey] = source;
    return source;
  }

  // Fallback to griffey if something went wrong
  return Images.griffey;
};
