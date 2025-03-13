import React, { Suspense, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card as PaperCard, Text, ActivityIndicator } from "react-native-paper";
import { graphql, useLazyLoadQuery } from "react-relay";
import { CardImageKey, getImage } from "../assets/images";
import { DetailScreenProps } from "../navigation/types";
import { GetCardQuery } from "../relay/queries/GetCardQuery";
import { useToggleCardLike } from "../hooks/useToggleCardLike";
import { LikeButton } from "./shared/LikeButton";
import { CardDetailQuery } from "./__generated__/CardDetailQuery.graphql";
import { Card } from "../types/card";

const CardContent: React.FC<{
  imageKey: CardImageKey;
  name: string;
  year: string;
  team: string;
  description: string;
  id: string;
  isLiked: boolean;
}> = React.memo(({ imageKey, name, year, team, description, id, isLiked }) => (
  <PaperCard style={styles.card} mode="elevated" elevation={2}>
    <View style={styles.cardContent}>
      <PaperCard.Cover
        source={getImage(imageKey)}
        resizeMode="contain"
        style={styles.image}
      />
      <PaperCard.Content>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.title}>
            {name}
          </Text>
          <LikeButton cardId={id} isLiked={isLiked} />
        </View>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {year} {team}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      </PaperCard.Content>
    </View>
  </PaperCard>
));

const CardDetailContent: React.FC<{ cardId: string }> = ({ cardId }) => {
  const data = useLazyLoadQuery<CardDetailQuery>(GetCardQuery, {
    id: cardId,
  });

  const { error } = useToggleCardLike();

  if (!data.card) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.message}>
          Card not found
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text variant="bodyLarge" style={styles.error}>
          Failed to update like status
        </Text>
      </View>
    );
  }

  const card = useMemo(() => {
    if (!data.card) return null;
    return {
      ...data.card,
      year: data.card.year.toString(),
    } as Card;
  }, [data.card]);

  if (!card) return null;

  const { imageKey, name, year, team, description, id, isLiked } = card;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CardContent
        imageKey={imageKey}
        name={name}
        year={year}
        team={team}
        description={description}
        id={id}
        isLiked={isLiked}
      />
    </ScrollView>
  );
};

const LoadingView: React.FC = () => (
  <View style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" />
  </View>
);

const ErrorView: React.FC<{ error: Error }> = ({ error }) => (
  <View style={[styles.container, styles.centered]}>
    <Text variant="bodyLarge" style={styles.error}>
      {error.message}
    </Text>
  </View>
);

export const CardDetail: React.FC<{ cardId: string }> = ({ cardId }) => (
  <Suspense fallback={<LoadingView />}>
    <CardDetailContent cardId={cardId} />
  </Suspense>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 16,
  },
  cardContent: {
    overflow: "hidden",
    borderRadius: 12,
    paddingBottom: 16,
  },
  image: {
    height: 400,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  description: {
    marginTop: 16,
    lineHeight: 24,
  },
  message: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  error: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
