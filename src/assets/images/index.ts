import { Image, ImageSourcePropType } from "react-native";

// Define the available baseball card images
export const Images = {
  griffey: require("./griffey.jpg"),
  jeter: require("./griffey.jpg"), // Using Griffey image as placeholder
  sosa: require("./griffey.jpg"), // Using Griffey image as placeholder
  jones: require("./griffey.jpg"), // Using Griffey image as placeholder
  ripken: require("./griffey.jpg"), // Using Griffey image as placeholder
} as const;

// Define valid image keys
export type CardImageKey = keyof typeof Images;

// Preload all images
export const preloadImages = () => {
  Object.values(Images).forEach(image => {
    if (typeof image === 'number') {
      Image.prefetch(Image.resolveAssetSource(image).uri);
    }
  });
};

// Cache for resolved image sources
const imageCache: Record<CardImageKey, ImageSourcePropType> = {} as Record<CardImageKey, ImageSourcePropType>;

// Helper function to get image source with caching
export const getImage = (key: CardImageKey | string): ImageSourcePropType => {
  const validKey = key in Images ? (key as CardImageKey) : 'griffey';
  
  // Return cached resolved source if available
  if (imageCache[validKey]) {
    return imageCache[validKey];
  }

  // Resolve and cache the source
  const source = Images[validKey];
  imageCache[validKey] = source;
  return source;
};
