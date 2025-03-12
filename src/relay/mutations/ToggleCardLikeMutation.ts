import { graphql } from "react-relay";

export const ToggleCardLikeMutation = graphql`
  mutation ToggleCardLikeMutation($input: ToggleCardLikeInput!) {
    toggleCardLike(input: $input) {
      card {
        id
        isLiked
      }
    }
  }
`;
