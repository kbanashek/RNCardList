import '@testing-library/jest-native';

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock react-relay
jest.mock('react-relay', () => ({
  ...jest.requireActual('react-relay'),
  useLazyLoadQuery: jest.fn(),
}));

// Mock CardList component
jest.mock('./src/components/CardList', () => {
  const React = require('react');
  const { View, TouchableOpacity } = require('react-native');
  const mockOnCardPress = jest.fn();

  const mockCard = {
    id: '1',
    name: 'Test Card',
    description: 'Test Description',
    imageKey: 'test-image',
    year: '2025',
    team: 'Test Team',
    isLiked: false,
  };

  const CardItem = ({ onPress }) => (
    <TouchableOpacity testID="card-item" onPress={() => onPress?.(mockCard)} />
  );

  return {
    CardList: ({ onCardPress }) => (
      <View>
        <CardItem onPress={onCardPress} />
      </View>
    ),
    __mockOnCardPress: mockOnCardPress,
    __mockCard: mockCard,
  };
});
