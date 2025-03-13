import { jest } from "@jest/globals";

// Mock react-native
jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles) => styles,
  },
  View: ({ children, style, testID }) => {
    const React = require("react");
    return React.createElement("View", { style, testID }, children);
  },
  ScrollView: ({ children, testID, style, showsVerticalScrollIndicator }) => {
    const React = require("react");
    return React.createElement(
      "ScrollView",
      { testID, style, showsVerticalScrollIndicator },
      children
    );
  },
  Image: ({ source, style }) => {
    const React = require("react");
    return React.createElement("Image", { source, style });
  },
  Text: ({ children, style }) => {
    const React = require("react");
    return React.createElement("Text", { style }, children);
  },
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock react-native-paper components
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Image, Text } = require("react-native");

  const Card = ({ children, style, mode, elevation }) =>
    React.createElement(View, { style: { ...style, elevation } }, children);

  Card.Cover = ({ source, style, resizeMode }) =>
    React.createElement(
      View,
      { style },
      React.createElement(Image, { source, style, resizeMode })
    );

  Card.Content = ({ children }) => React.createElement(View, null, children);

  return {
    Surface: ({ children, style }) =>
      React.createElement(View, { style }, children),
    ActivityIndicator: ({ size, color, testID }) =>
      React.createElement("ActivityIndicator", {
        testID: testID || "like-button-loader",
        size,
        color,
      }),
    IconButton: ({ icon, onPress, testID, style }) =>
      React.createElement("IconButton", {
        testID: testID || "like-button",
        onPress,
        style,
      }),
    Card,
    Text: ({ children, testID, style, variant }) =>
      React.createElement(Text, { testID, style }, children),
  };
});

// Mock react-relay
jest.mock("react-relay", () => ({
  useMutation: jest.fn(),
  useLazyLoadQuery: jest.fn(),
  graphql: jest.fn(),
}));

// Mock navigation
export const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock useToggleCardLike hook
jest.mock("./src/hooks/useToggleCardLike", () => {
  const loadingCardIds = new Set();
  let error = null;

  return {
    useToggleCardLike: () => ({
      toggleLike: (cardId, isCurrentlyLiked) => {
        loadingCardIds.add(cardId);
        const { useMutation } = require("react-relay");
        const [commit] = useMutation();
        commit({
          variables: { input: { cardId } },
          optimisticResponse: {
            toggleCardLike: {
              card: {
                id: cardId,
                isLiked: !isCurrentlyLiked,
              },
            },
          },
        });
      },
      isCardLoading: (cardId) => loadingCardIds.has(cardId),
      error,
    }),
  };
});

// Mock LikeButton component
jest.mock("./src/components/shared/LikeButton", () => {
  const React = require("react");

  return {
    LikeButton: ({ cardId, isLiked }) => {
      const { useToggleCardLike } = require("./src/hooks/useToggleCardLike");
      const { toggleLike, isCardLoading } = useToggleCardLike();
      const loading = isCardLoading(cardId);

      return React.createElement(
        "View",
        { testID: "like-button-container" },
        [
          React.createElement("IconButton", {
            key: "button",
            testID: "like-button",
            onPress: () => toggleLike(cardId, isLiked),
            style: { opacity: loading ? 0.5 : 1 },
          }),
          loading &&
            React.createElement("ActivityIndicator", {
              key: "loader",
              testID: "like-button-loader",
              size: "small",
            }),
        ].filter(Boolean)
      );
    },
  };
});

// Mock CardDetail component following React Native Paper patterns
jest.mock("./src/components/CardDetail", () => {
  const React = require("react");
  const { View, ScrollView } = require("react-native");
  const { Card, Text } = require("react-native-paper");
  const { useLazyLoadQuery } = require("react-relay");
  const { LikeButton } = require("./src/components/shared/LikeButton");

  const CardContent = ({ card }) => {
    // Follow React Native Paper pattern: wrap content in View with overflow hidden
    return React.createElement(
      Card,
      { style: { margin: 16 } },
      React.createElement(
        View,
        { style: { overflow: "hidden", borderRadius: 12 } },
        React.createElement(Card.Content, null, [
          React.createElement(
            View,
            {
              key: "header",
              style: { flexDirection: "row", justifyContent: "space-between" },
            },
            [
              React.createElement(
                Text,
                { key: "title", variant: "titleLarge" },
                card.name
              ),
              React.createElement(LikeButton, {
                key: "like",
                cardId: card.id,
                isLiked: card.isLiked,
              }),
            ]
          ),
          React.createElement(
            Text,
            { key: "subtitle", variant: "bodyMedium" },
            `${card.year} ${card.team}`
          ),
          React.createElement(
            Text,
            { key: "description", variant: "bodyMedium" },
            card.description
          ),
        ])
      )
    );
  };

  return {
    CardDetail: ({ cardId }) => {
      const data = useLazyLoadQuery(null, { cardId });
      return React.createElement(
        ScrollView,
        {
          testID: "card-detail-scroll",
          showsVerticalScrollIndicator: false,
        },
        React.createElement(CardContent, { card: data.card })
      );
    },
  };
});

// Mock CardList component
jest.mock("./src/components/CardList", () => {
  const React = require("react");
  const { ScrollView } = require("react-native");

  return {
    CardList: ({ cards, onCardPress }) =>
      React.createElement(
        ScrollView,
        { testID: "card-list-scroll" },
        cards.map((card) =>
          React.createElement("View", {
            key: card.id,
            testID: "card-item",
            onPress: () => onCardPress(card.id),
          })
        )
      ),
  };
});

// Setup global fetch mock
global.fetch = jest.fn();
