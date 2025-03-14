// Interface matching our GraphQL schema
import { CardImageKey } from "../assets/images";

export interface Card {
  id: string;
  name: string;
  year: string;
  team: string;
  description: string;
  imageKey: CardImageKey;
  isLiked: boolean;
}
