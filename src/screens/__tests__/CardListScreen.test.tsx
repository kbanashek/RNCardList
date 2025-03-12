import "@testing-library/jest-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CardListScreen } from "../CardListScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { HomeScreenProps } from "../../navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../navigation/types";

// Get the mock functions from the CardList mock
const { __mockOnCardPress } = jest.requireMock("../../components/CardList");

// Create mock navigation and route props
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockNavigation: Partial<
  NativeStackNavigationProp<RootStackParamList, "Home">
> = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

const mockRoute: RouteProp<RootStackParamList, "Home"> = {
  key: "mock-key",
  name: "Home",
};

const mockProps: HomeScreenProps = {
  navigation: mockNavigation as NativeStackNavigationProp<
    RootStackParamList,
    "Home"
  >,
  route: mockRoute,
};

describe("CardListScreen", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockNavigate.mockReset();
    mockGoBack.mockReset();
    __mockOnCardPress.mockReset();
  });

  it("renders without crashing", () => {
    render(
      <SafeAreaProvider>
        <CardListScreen {...mockProps} />
      </SafeAreaProvider>
    );
  });

  it("renders CardList component", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CardListScreen {...mockProps} />
      </SafeAreaProvider>
    );

    expect(getByTestId("card-list-container")).toBeTruthy();
  });

  it("applies safe area insets", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CardListScreen {...mockProps} />
      </SafeAreaProvider>
    );

    const container = getByTestId("card-list-container");
    expect(container.props.style).toMatchObject({ flex: 1 });
  });

  it("renders within SafeAreaView", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CardListScreen {...mockProps} />
      </SafeAreaProvider>
    );

    const safeAreaView = getByTestId("card-list-container");
    expect(safeAreaView).toBeTruthy();
  });

  it("navigates to card details on card press", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <CardListScreen {...mockProps} />
      </SafeAreaProvider>
    );

    const card = getByTestId("card-item");
    fireEvent.press(card);
    expect(mockNavigate).toHaveBeenCalledWith("Detail", { cardId: "1" });
  });
});
