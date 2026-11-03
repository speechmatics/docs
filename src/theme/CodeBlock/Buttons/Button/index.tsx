import React, {type ReactNode} from 'react';
import {IconButton, type IconButtonProps} from '@radix-ui/themes';

type Props = Omit<IconButtonProps, 'asChild'>;

// Toggle buttons pass `aria-pressed`; the pressed state picks up the accent
// colour so the visual state always matches what assistive tech announces.
export default function CodeBlockButton(props: Props): ReactNode {
  const pressed = props['aria-pressed'] === true;
  return (
    <IconButton
      type="button"
      size="2"
      variant="surface"
      color={pressed ? undefined : 'gray'}
      {...props}
    />
  );
}
