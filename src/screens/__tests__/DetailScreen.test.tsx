import React from "react";
import { render } from "@testing-library/react-native";
import { DetailScreen } from "../DetailScreen";
import { CardDetail } from "../../components/CardDetail";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

jest.mock("../../components/CardDetail", () => ({
  CardDetail: jest.fn(() => null),
}));

describe("DetailScreen", () => {
  const mockRoute: RouteProp<RootStackParamList, "Detail"> = {
    key: "Detail-123",
    name: "Detail",
    params: {
      cardId: "test-card-id",
    },
  };

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as NativeStackNavigationProp<RootStackParamList, "Detail">;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SafeAreaView", () => {
    const { getByTestId } = render(
      <DetailScreen route={mockRoute} navigation={mockNavigation} />
    );
    expect(getByTestId("detail-screen-container")).toBeTruthy();
  });

  it("passes correct cardId to CardDetail component", () => {
    render(<DetailScreen route={mockRoute} navigation={mockNavigation} />);
    expect(CardDetail).toHaveBeenCalledWith(
      expect.objectContaining({
        cardId: "test-card-id",
      }),
      expect.anything()
    );
  });
});
