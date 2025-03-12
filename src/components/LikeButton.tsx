import React from "react";
import { StyleSheet } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { useToggleCardLike } from "../hooks/useToggleCardLike";

interface LikeButtonProps {
  cardId: string;
  isLiked: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ cardId, isLiked }) => {
  const { toggleLike, isCardLoading } = useToggleCardLike();

  return isCardLoading(cardId) ? (
    <ActivityIndicator size={24} style={styles.loader} />
  ) : (
    <IconButton
      icon={isLiked ? "heart" : "heart-outline"}
      onPress={() => toggleLike(cardId)}
      size={24}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    margin: 8,
  },
});
