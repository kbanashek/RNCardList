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

// Create a RecordSource instance that will be used for caching
const recordSource = new RecordSource();

// Initialize the Relay store with caching enabled
const store = new Store(recordSource, {
  gcReleaseBufferSize: 10, // Keep more records in memory
});

const fetchQuery = async (operation: any, variables: any) => {
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
  store,
  // Enable query caching
  options: {
    fetchTimeout: 30000, // 30 second timeout
    subscriptionResponseCacheConfig: {
      size: 250, // Cache size
      ttl: 60 * 60 * 1000, // 1 hour
    },
  },
});

export default environment;
