import { Card } from "../types/card";

export enum RelayOperation {
  GET_CARDS = "GetCardsQuery",
  GET_CARD = "GetCardQuery",
  TOGGLE_LIKE = "ToggleCardLikeMutation"
}

export interface GetCardsQuery {
  variables: {};
  response: {
    cards: ReadonlyArray<Card>;
  };
}

export interface GetCardQuery {
  variables: {
    id: string;
  };
  response: {
    card: Card;
  };
}

export interface ToggleCardLikeMutation {
  variables: {
    input: {
      cardId: string;
    };
  };
  response: {
    toggleCardLike: {
      card: Card;
    };
  };
}
