import { renderHook, act } from "@testing-library/react-native";
import { useMutation } from "react-relay";
import { useToggleCardLike } from "../useToggleCardLike";

jest.mock("react-relay", () => ({
  useMutation: jest.fn(),
}));

describe("useToggleCardLike", () => {
  const mockCommit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useMutation as jest.Mock).mockReturnValue([mockCommit]);
  });

  it("toggles like status with optimistic update", () => {
    const { result } = renderHook(() => useToggleCardLike());
    const cardId = "card-1";
    const isCurrentlyLiked = false;

    result.current.toggleLike(cardId, isCurrentlyLiked);

    expect(mockCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { input: { cardId } },
        optimisticResponse: {
          toggleCardLike: {
            card: {
              id: cardId,
              isLiked: true,
            },
          },
        },
      })
    );
  });
});
