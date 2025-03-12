import React, { useCallback } from "react";
import { ActivityIndicator, IconButton, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useToggleCardLike } from "../../hooks/useToggleCardLike";

interface LikeButtonProps {
  cardId: string;
  isLiked: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = React.memo(({
  cardId,
  isLiked,
}) => {
  const theme = useTheme();
  const { toggleLike, isCardLoading } = useToggleCardLike();
  const loading = isCardLoading(cardId);

  const handlePress = useCallback(() => {
    toggleLike(cardId);
  }, [cardId, toggleLike]);

  if (loading) {
    return (
      <ActivityIndicator
        size={20}
        color={theme.colors.primary}
        style={styles.loader}
      />
    );
  }

  return (
    <IconButton
      icon={isLiked ? "heart" : "heart-outline"}
      size={20}
      iconColor={isLiked ? theme.colors.error : theme.colors.onSurfaceVariant}
      onPress={handlePress}
      mode="contained-tonal"
      selected={isLiked}
    />
  );
});

// Display name for debugging
LikeButton.displayName = 'LikeButton';

const styles = StyleSheet.create({
  loader: {
    margin: 0,
    padding: 8,
  },
});
