import React, { useState } from 'react';
import { Slider, Stack, Text, Box, Center } from 'native-base';
import { onChange } from 'react-native-reanimated';

interface ISlidersProps {
  difficulty: number;
  onChange: (value: number) => void;
}

export default function Sliders({ difficulty, onChange }: ISlidersProps) {
  return (
    <Center px="3" py="5">
      <Box alignItems="center" w="100%">
        <Stack space={4} alignItems="center" w="75%" maxW="300">
          <Text textAlign="center">{difficulty}</Text>
          <Slider
            defaultValue={1}
            colorScheme="tertiary"
            onChange={onChange}
            maxValue={5}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Stack>
      </Box>
    </Center>
  );
}
