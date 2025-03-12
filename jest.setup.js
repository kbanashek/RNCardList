import '@testing-library/jest-native';

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock navigation
export const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock react-relay
jest.mock('react-relay', () => ({
  ...jest.requireActual('react-relay'),
  useLazyLoadQuery: jest.fn(),
}));

// Mock CardItem component
jest.mock('./src/components/shared/CardItem', () => {
  const React = require('react');
  const { TouchableOpacity } = require('react-native');

  return {
    CardItem: ({ item }) => (
      <TouchableOpacity testID="card-item" onPress={() => mockNavigate('Detail', { cardId: item.id })} />
    ),
  };
});

// Mock CardList component
jest.mock('./src/components/CardList', () => {
  const React = require('react');
  const { View } = require('react-native');
  const { CardItem } = require('./src/components/shared/CardItem');

  const mockCard = {
    id: '1',
    name: 'Test Card',
    description: 'Test Description',
    imageKey: 'test-image',
    year: '2025',
    team: 'Test Team',
    isLiked: false,
  };

  return {
    CardList: () => (
      <View>
        <CardItem item={mockCard} />
      </View>
    ),
    __mockCard: mockCard,
  };
});
