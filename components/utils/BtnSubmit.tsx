import React from 'react';
import { Button, Stack } from 'native-base';

interface IBtnSubmitProps {
  isLoading?: boolean;
  width?: string;
  backgroundColor: string;
  text: string;
  onPress: (e: any) => void;
  height?: string;
}

export default function BtnSubmit({
  isLoading,
  width,
  backgroundColor,
  onPress,
  text,
  height,
}: IBtnSubmitProps) {
  return (
    <Button
      isLoading={isLoading}
      isLoadingText="Connexion en cours..."
      w={width}
      h={height}
      backgroundColor={backgroundColor}
      onPress={onPress}
      padding={0}
    >
      {text}
    </Button>
  );
}
