import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { Skeleton } from "./Skeleton";

const CardContent = React.memo(() => {
  const theme = useTheme();
  
  return (
    <Card.Content style={styles.content}>
      <View style={styles.header}>
        <Skeleton width="80%" height={32} />
        <Skeleton width={24} height={24} style={styles.icon} />
      </View>
      <Skeleton width="100%" height={20} style={styles.description} />
      <Skeleton width="90%" height={20} style={styles.description} />
      {[1, 2, 3, 4].map((key) => (
        <Skeleton
          key={key}
          width={`${90 - key * 5}%`}
          height={18}
          style={styles.contentLine}
        />
      ))}
    </Card.Content>
  );
});

// Add display name for debugging
CardContent.displayName = 'CardContent';

export const CardDetailSkeleton = React.memo(() => {
  const theme = useTheme();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Card 
        style={[styles.card, { backgroundColor: theme.colors.surface }]} 
        mode="elevated" 
        elevation={2}
      >
        <Skeleton height={300} borderRadius={0} />
        <CardContent />
      </Card>
    </ScrollView>
  );
});

// Add display name for debugging
CardDetailSkeleton.displayName = 'CardDetailSkeleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  icon: {
    borderRadius: 12,
  },
  description: {
    marginBottom: 8,
  },
  contentLine: {
    marginBottom: 8,
  },
});
