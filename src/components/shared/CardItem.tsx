import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card as PaperCard, Text, useTheme } from "react-native-paper";
import { getImage } from "../../assets/images";
import { Card } from "../../types/card";
import { LikeButton } from "./LikeButton";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../navigation/types";

interface CardItemProps {
  item: Card;
}

export const CardItem: React.FC<CardItemProps> = React.memo(({ item }) => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handlePress = React.useCallback(() => {
    navigation.navigate("Detail", { cardId: item.id });
  }, [item.id, navigation]);

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
            {item.description.split(". ")[0]}...
          </Text>
        </PaperCard.Content>
      </PaperCard>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 400,
    marginVertical: 0,
    backgroundColor: "#f5f5f5",
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
});
