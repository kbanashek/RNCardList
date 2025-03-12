// Interface matching our GraphQL schema
export interface Card {
  id: string;
  name: string;
  year: number;
  team: string;
  description: string;
  imageKey: string;
  isLiked: boolean;
}
