import { Image, ImageSourcePropType } from "react-native";

// Define the available baseball card images
export const Images = {
  griffey: require("./images/griffey.jpg"),
  jeter: require("./images/jeter.jpg"),
  sosa: require("./images/sosa.jpg"),
  jones: require("./images/jones.jpg"),
  ripken: require("./images/ripken.jpg"),
} as const;

export type CardImageKey = keyof typeof Images;

// Preload all images for better performance
export const preloadImages = () => {
  Object.values(Images).forEach((image) => {
    if (typeof image === "number") {
      Image.prefetch(Image.resolveAssetSource(image).uri);
    }
  });
};

const imageCache: Record<CardImageKey, ImageSourcePropType> = {} as Record<
  CardImageKey,
  ImageSourcePropType
>;

export const getImage = (key: CardImageKey | string): ImageSourcePropType => {
  if (key in Images) {
    const validKey = key as CardImageKey;

    if (imageCache[validKey]) {
      return imageCache[validKey];
    }

    const source = Images[validKey];
    imageCache[validKey] = source;
    return source;
  }

  return Images.griffey;
};
