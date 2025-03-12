import React, { Suspense, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card as PaperCard, Text, ActivityIndicator } from "react-native-paper";
import { graphql, useLazyLoadQuery } from "react-relay";
import { getImage } from "../assets/images/index";
import { DetailScreenProps } from "../navigation/types";
import { GetCardQuery } from "../relay/queries/GetCardQuery";
import { useToggleCardLike } from "../hooks/useToggleCardLike";
import { LikeButton } from "./LikeButton";
import { CardDetailQuery } from "./__generated__/CardDetailQuery.graphql";
import { Card } from "../types/card";

const CardContent: React.FC<{
  imageKey: string;
  name: string;
  year: string;
  team: string;
  description: string;
  id: string;
  isLiked: boolean;
}> = React.memo(({ imageKey, name, year, team, description, id, isLiked }) => (
  <PaperCard style={styles.card}>
    <PaperCard.Cover source={getImage(imageKey)} resizeMode="cover" />
    <PaperCard.Content>
      <Text variant="titleLarge">{name}</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {year} {team}
      </Text>
      <Text variant="bodyMedium" style={styles.body}>
        {description}
      </Text>
    </PaperCard.Content>
    <PaperCard.Actions>
      <LikeButton cardId={id} isLiked={isLiked} />
    </PaperCard.Actions>
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

  const card = useMemo(() => data.card, [data.card]) as Card;
  const { imageKey, name, year, team, description, id, isLiked } = card;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CardContent
        imageKey={imageKey}
        name={name}
        year={year.toString()}
        team={team.toString()}
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
    backgroundColor: "#f5f5f5",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  subtitle: {
    color: "#666",
    marginVertical: 4,
  },
  body: {
    color: "#333",
    marginTop: 8,
  },
  message: {
    color: "#666",
  },
  error: {
    color: "#d32f2f",
  },
});
