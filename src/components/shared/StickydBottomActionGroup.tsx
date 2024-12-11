import { PropsWithChildren } from 'react';

export const StickydBottomActionGroup = ({ children }: PropsWithChildren) => {
  return (
    <div className="sticky bottom-0 left-0 z-20 grid w-full grid-cols-2 items-center justify-center bg-white">
      {children}
    </div>
  );
};
