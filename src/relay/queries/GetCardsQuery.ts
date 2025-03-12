import { graphql } from "relay-runtime";

export const GetCardsQuery = graphql`
  query GetCardsQuery {
    cards {
      id
      name
      year
      team
      description
      imageKey
      isLiked
    }
  }
`;
