import "@testing-library/jest-native";
import React from "react";
import { render } from "@testing-library/react-native";
import { CardDetail } from "../CardDetail";
import { useLazyLoadQuery } from "react-relay";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

const mockCard = {
  id: "1",
  name: "Babe Ruth",
  imageKey: "babe-ruth",
  year: "1933",
  team: "Yankees",
  description: "The Great Bambino",
  isLiked: false,
};

jest.mock("react-relay", () => ({
  useLazyLoadQuery: jest.fn(),
  graphql: jest.fn(),
}));

// Mock React Native Paper components
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Image, Text } = require("react-native");

  const Card = ({
    children,
    style,
  }: {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
  }) => {
    return React.createElement(View, { style }, children);
  };

  Card.Cover = ({
    source,
    style,
    testID,
    resizeMode,
  }: {
    source: { uri: string };
    style?: StyleProp<ImageStyle>;
    testID?: string;
    resizeMode?: "contain" | "cover" | "stretch" | "center";
  }) => {
    return React.createElement(Image, { source, style, testID, resizeMode });
  };

  Card.Content = ({ children }: { children: ReactNode }) => {
    return React.createElement(View, null, children);
  };

  return {
    Card,
    Text: ({
      children,
      variant,
      style,
      testID,
    }: {
      children: ReactNode;
      variant?: string;
      style?: StyleProp<TextStyle>;
      testID?: string;
    }) => {
      // Use provided testID or fall back to variant for backward compatibility
      return React.createElement(
        Text,
        { style, testID: testID || variant },
        children
      );
    },
    ActivityIndicator: ({
      testID,
      size,
    }: {
      testID?: string;
      size?: "small" | "large";
    }) => {
      return React.createElement(View, { testID });
    },
  };
});

jest.mock("../shared/LikeButton", () => ({
  LikeButton: ({ cardId, isLiked }: { cardId: string; isLiked: boolean }) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, { testID: "like-button" });
  },
}));

const mockToggleLike = jest.fn();
jest.mock("../../hooks/useToggleCardLike", () => ({
  useToggleCardLike: () => ({
    toggleLike: mockToggleLike,
    isLoading: false,
    error: null,
  }),
}));

jest.mock("../../assets/images", () => ({
  getImage: (key: string) => ({ uri: `mock-image-${key}.jpg` }),
  CardImageKey: {
    "babe-ruth": "babe-ruth",
  },
}));

jest.mock("react-native", () => {
  const React = require("react");
  return {
    View: ({
      children,
      style,
      testID,
    }: {
      children?: ReactNode;
      style?: StyleProp<ViewStyle>;
      testID?: string;
    }) => React.createElement("View", { style, testID }, children),
    ScrollView: ({
      children,
      testID,
    }: {
      children?: ReactNode;
      testID?: string;
    }) => React.createElement("ScrollView", { testID }, children),
    Image: ({
      source,
      style,
      testID,
    }: {
      source: { uri: string };
      style?: StyleProp<ImageStyle>;
      testID?: string;
    }) => React.createElement("Image", { source, style, testID }),
    Text: ({
      children,
      style,
      testID,
    }: {
      children?: ReactNode;
      style?: StyleProp<TextStyle>;
      testID?: string;
    }) => React.createElement("Text", { style, testID }, children),
    StyleSheet: {
      create: (
        styles: Record<string, StyleProp<ViewStyle | TextStyle | ImageStyle>>
      ) => styles,
      flatten: (style: StyleProp<ViewStyle | TextStyle | ImageStyle>) => style,
    },
  };
});

describe("CardDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLazyLoadQuery as jest.Mock).mockReturnValue({ card: mockCard });
  });

  it("renders card data correctly", () => {
    const { getByTestId, getAllByTestId } = render(<CardDetail cardId="1" />);

    // Verify card data is displayed
    expect(getByTestId("titleLarge")).toHaveTextContent("Babe Ruth");

    // Find bodyMedium elements and verify their content
    const bodyMediumElements = getAllByTestId("bodyMedium");
    expect(bodyMediumElements[0]).toHaveTextContent("1933 Yankees");
    expect(bodyMediumElements[1]).toHaveTextContent("The Great Bambino");
  });
});
