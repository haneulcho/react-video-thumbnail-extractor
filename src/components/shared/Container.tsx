import { PropsWithChildren } from 'react';

import { cn } from '@/utils';

type Props = {
  className?: string;
};

export const Container = ({ children }: PropsWithChildren<Props>) => {
  return <div className={cn(['relative mx-auto w-full min-w-80 max-w-5xl px-6 py-9'])}>{children}</div>;
};
