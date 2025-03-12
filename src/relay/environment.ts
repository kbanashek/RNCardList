import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { mockCards } from "./mockData";

interface Card {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  isLiked?: boolean;
}

const fetchQuery = async (operation: any, variables: any) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock response based on operation
  switch (operation.name) {
    case "GetCardsQuery":
      return {
        data: {
          cards: mockCards,
        },
      };
    case "GetCardQuery":
      const card = mockCards.find((card) => card.id === variables.id);
      return {
        data: {
          card,
        },
      };
    case "ToggleCardLikeMutation": {
      const { input } = variables;
      const { cardId } = input;
      const targetCard = mockCards.find((c) => c.id === cardId);
      if (targetCard) {
        targetCard.isLiked = !targetCard.isLiked;
        return {
          data: {
            toggleCardLike: {
              card: targetCard,
            },
          },
        };
      }
      throw new Error(`Card not found: ${cardId}`);
    }
    default:
      throw new Error(`Unhandled operation: ${operation.name}`);
  }
};

const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default environment;
