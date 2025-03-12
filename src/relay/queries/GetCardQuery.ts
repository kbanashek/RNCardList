import { graphql } from "relay-runtime";

export const GetCardQuery = graphql`
  query GetCardQuery($id: ID!) {
    card(id: $id) {
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
