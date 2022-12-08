import React from 'react';
import { Divider, View } from 'native-base';

type Orientation = 'horizontal' | 'vertical';

export default function DividerComponent({
  color,
  orientation,
  mt,
}: {
  color: string;
  orientation: Orientation;
  mt: string;
}) {
  return <Divider bg={color} thickness="2" mt={mt} orientation={orientation} />;
}
