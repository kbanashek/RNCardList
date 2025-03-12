import { Card } from "../types/card";

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
