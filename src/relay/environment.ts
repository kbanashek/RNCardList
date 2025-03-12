import { Environment, Network, RecordSource, Store, FetchFunction, RequestParameters } from "relay-runtime";
import { mockCards } from "./mockData";
import { RelayOperation, GetCardsQuery, GetCardQuery, ToggleCardLikeMutation } from "./types";

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

type QueryResponse<T> = {
  data: T;
};

const fetchQuery: FetchFunction = async (
  request: RequestParameters,
  variables: GetCardsQuery["variables"] | GetCardQuery["variables"] | ToggleCardLikeMutation["variables"]
): Promise<QueryResponse<GetCardsQuery["response"] | GetCardQuery["response"] | ToggleCardLikeMutation["response"]>> => {
  // Mock response based on operation
  switch (request.name) {
    case RelayOperation.GET_CARDS:
      return {
        data: {
          cards: mockCards,
        },
      };
    case RelayOperation.GET_CARD:
      const cardVariables = variables as GetCardQuery["variables"];
      const card = mockCards.find((card) => card.id === cardVariables.id);
      if (!card) {
        throw new Error(`Card not found: ${cardVariables.id}`);
      }
      return {
        data: {
          card,
        },
      };
    case RelayOperation.TOGGLE_LIKE: {
      const likeVariables = variables as ToggleCardLikeMutation["variables"];
      const { cardId } = likeVariables.input;
      const targetCard = mockCards.find((c) => c.id === cardId);
      if (!targetCard) {
        throw new Error(`Card not found: ${cardId}`);
      }
      targetCard.isLiked = !targetCard.isLiked;
      return {
        data: {
          toggleCardLike: {
            card: targetCard,
          },
        },
      };
    }
    default:
      throw new Error(`Unhandled operation: ${request.name}`);
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
