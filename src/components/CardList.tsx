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

const CardListContent: React.FC = () => {
  const data = useLazyLoadQuery<CardListQuery>(GetCardsQuery, {});
  const { error } = useToggleCardLike();

  const renderCard = useCallback(
    ({ item }: { item: Card }) => <CardItem item={item} />,
    []
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

  const cards = useMemo(() => {
    if (!data.cards) return [];
    return data.cards.map(card => ({
      ...card,
      year: card.year.toString()
    })) as Card[];
  }, [data.cards]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

const CardListSkeleton = () => (
  <View style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" />
  </View>
);

const ErrorFallback = ({ error }: FallbackProps) => (
  <View style={[styles.container, styles.centered]}>
    <Text variant="bodyLarge" style={styles.error}>
      {error.message}
    </Text>
  </View>
);

export const CardList: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CardListSkeleton />}>
        <CardListContent />
      </Suspense>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
  error: {
    color: "#dc3545",
  },
});
