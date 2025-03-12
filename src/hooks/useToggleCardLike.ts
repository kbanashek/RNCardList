import { useMutation } from "react-relay";
import { useState, useCallback } from "react";
import { ToggleCardLikeMutation } from "../relay/mutations/ToggleCardLikeMutation";
import type { ToggleCardLikeMutation as ToggleCardLikeMutationType } from "../relay/mutations/__generated__/ToggleCardLikeMutation.graphql";

interface MutationState {
  loadingCardIds: Set<string>;
  error: Error | null;
}

export const useToggleCardLike = () => {
  const [state, setState] = useState<MutationState>({
    loadingCardIds: new Set(),
    error: null,
  });

  const [commit] = useMutation<ToggleCardLikeMutationType>(
    ToggleCardLikeMutation
  );

  const toggleLike = useCallback(
    (cardId: string) => {
      setState(prev => ({
        loadingCardIds: new Set(prev.loadingCardIds).add(cardId),
        error: null,
      }));

      commit({
        variables: {
          input: { cardId },
        },
        optimisticResponse: {
          toggleCardLike: {
            card: {
              id: cardId,
              isLiked: true,
            },
          },
        },
        onCompleted: () => {
          setState(prev => {
            const newLoadingCardIds = new Set(prev.loadingCardIds);
            newLoadingCardIds.delete(cardId);
            return {
              loadingCardIds: newLoadingCardIds,
              error: null,
            };
          });
        },
        onError: (error) => {
          setState(prev => {
            const newLoadingCardIds = new Set(prev.loadingCardIds);
            newLoadingCardIds.delete(cardId);
            return {
              loadingCardIds: newLoadingCardIds,
              error,
            };
          });
        },
      });
    },
    [commit]
  );

  const isCardLoading = useCallback(
    (cardId: string) => state.loadingCardIds.has(cardId),
    [state.loadingCardIds]
  );

  return {
    toggleLike,
    isCardLoading,
    error: state.error,
  };
};
