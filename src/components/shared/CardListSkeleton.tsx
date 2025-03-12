import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { Skeleton } from "./Skeleton";

const CardSkeleton = React.memo(() => {
  const theme = useTheme();
  
  return (
    <Card 
      style={[styles.card, { backgroundColor: theme.colors.surface }]} 
      mode="elevated" 
      elevation={2}
    >
      <Skeleton height={200} borderRadius={0} />
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Skeleton width="70%" height={24} />
          <Skeleton width={24} height={24} style={styles.icon} />
        </View>
        <Skeleton width="100%" height={16} style={styles.description} />
        <Skeleton width="80%" height={16} />
      </Card.Content>
    </Card>
  );
});

// Add display name for debugging
CardSkeleton.displayName = 'CardSkeleton';

export const CardListSkeleton = React.memo(() => {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {[1, 2, 3].map((key) => (
        <CardSkeleton key={key} />
      ))}
    </View>
  );
});

// Add display name for debugging
CardListSkeleton.displayName = 'CardListSkeleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    margin: 8,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    borderRadius: 12,
  },
  description: {
    marginBottom: 8,
  },
});
