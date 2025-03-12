import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card as PaperCard, Text, useTheme } from "react-native-paper";
import { getImage } from "../../assets/images";
import { Card } from "../../types/card";
import { LikeButton } from "../LikeButton";

interface CardItemProps {
  item: Card;
  onPress: (card: Card) => void;
}

export const CardItem: React.FC<CardItemProps> = React.memo(
  ({ item, onPress }) => {
    const theme = useTheme();

    const handlePress = React.useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <PaperCard
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          mode="elevated"
          elevation={2}
        >
          <PaperCard.Cover
            source={getImage(item.imageKey)}
            resizeMode="contain"
            style={styles.image}
          />
          <PaperCard.Content>
            <View style={styles.header}>
              <Text variant="titleLarge" style={styles.title}>
                {item.name}
              </Text>
              <LikeButton cardId={item.id} isLiked={item.isLiked} />
            </View>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {item.year} {item.team}
            </Text>
            <Text variant="bodyMedium" style={styles.body}>
              {item.description.split('. ')[0]}...
            </Text>
          </PaperCard.Content>
        </PaperCard>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
  },
  subtitle: {
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
  },
  body: {
    color: "#333",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  image: {
    height: 400,
    marginVertical: 0,
    backgroundColor: "#f5f5f5",
  },
});
