import React, { Suspense, useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useLazyLoadQuery } from "react-relay";
import { Card } from "../types/card";
import { CardListQuery } from "./__generated__/CardListQuery.graphql";
import { GetCardsQuery } from "../relay/queries/GetCardsQuery";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useToggleCardLike } from "../hooks/useToggleCardLike";
import { CardItem } from "./shared/CardItem";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../navigation/types";

interface CardListContentProps {
  onCardPress: (card: Card) => void;
}

const CardListContent: React.FC<CardListContentProps> = ({ onCardPress }) => {
  const data = useLazyLoadQuery<CardListQuery>(GetCardsQuery, {});
  const { error } = useToggleCardLike();

  const renderCard = useCallback(
    ({ item }: { item: Card }) => (
      <CardItem item={item} onPress={(card: Card) => onCardPress(card)} />
    ),
    [onCardPress]
  );

  const keyExtractor = useCallback((item: Card) => item.id, []);

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text variant="bodyLarge" style={styles.error}>
          Failed to update like status
        </Text>
      </View>
    );
  }

  const cards = useMemo(() => data.cards as Card[], [data.cards]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CardListSkeleton: React.FC = () => (
  <View style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" />
  </View>
);

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => (
  <View style={[styles.container, styles.centered]}>
    <Text variant="bodyLarge" style={styles.error}>
      {error.message}
    </Text>
  </View>
);

export const CardList: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCardPress = useCallback(
    (card: Card) => {
      navigation.navigate("Detail", { cardId: card.id });
    },
    [navigation]
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CardListSkeleton />}>
        <CardListContent onCardPress={handleCardPress} />
      </Suspense>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingVertical: 8,
  },
  error: {
    color: "#d32f2f",
  },
});
