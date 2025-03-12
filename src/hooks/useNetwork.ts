import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkInitialConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected ?? true);
      setIsLoading(false);
    };

    checkInitialConnection();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  return {
    isConnected,
    isLoading,
  };
};
