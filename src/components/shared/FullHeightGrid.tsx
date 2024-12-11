import { PropsWithChildren } from 'react';

import { cn } from '@/utils';

type Props = {
  className?: string;
};

export const FullHeightGrid = ({ children }: PropsWithChildren<Props>) => {
  return <div className={cn(['grid min-h-full grid-rows-[1fr_auto]'])}>{children}</div>;
};
