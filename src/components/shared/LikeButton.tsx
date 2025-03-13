import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { useToggleCardLike } from "../../hooks/useToggleCardLike";

interface LikeButtonProps {
  cardId: string;
  isLiked: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ cardId, isLiked }) => {
  const { toggleLike, isCardLoading } = useToggleCardLike();
  const loading = isCardLoading(cardId);

  return (
    <View style={styles.container}>
      <IconButton
        icon={isLiked ? "heart" : "heart-outline"}
        onPress={() => toggleLike(cardId, isLiked)}
        size={24}
        style={styles.button}
        disabled={loading}
      />
      {loading && <ActivityIndicator size={20} style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 0,
  },
  loader: {
    position: "absolute",
  },
});
