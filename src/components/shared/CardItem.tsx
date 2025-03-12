import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card as PaperCard, Text, useTheme } from "react-native-paper";
import { getImage } from "../../assets/images";
import { Card } from "../../types/card";
import { LikeButton } from "../LikeButton";

interface CardItemProps {
  item: Card;
  onPress: (card: Card) => void;
}

export const CardItem: React.FC<CardItemProps> = React.memo(({ item, onPress }) => {
  const theme = useTheme();
  
  // When pressed, pass the entire card object back to the parent
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
          resizeMode="cover"
        />
        <PaperCard.Content>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {item.year} {item.team}
          </Text>
          <Text variant="bodyMedium" style={styles.body}>
            {item.description}
          </Text>
        </PaperCard.Content>
        <PaperCard.Actions>
          <LikeButton cardId={item.id} isLiked={item.isLiked} />
        </PaperCard.Actions>
      </PaperCard>
    </TouchableOpacity>
  );
});

// Add display name for debugging
CardItem.displayName = 'CardItem';

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  subtitle: {
    color: "#666",
    marginVertical: 4,
  },
  body: {
    color: "#333",
    marginTop: 8,
  },
});
