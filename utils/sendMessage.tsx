import { Share } from 'react-native';

export const sendMessage = async (message: string) => {
  try {
    await Share.share({
      message
    });
  } catch (error) {
    console.error('Error sharing message:', error);
  }
};

