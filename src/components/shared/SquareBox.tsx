import { PropsWithChildren } from 'react';

export const SquareBox = ({ children }: PropsWithChildren) => {
  return (
    <>
      <span className="ratio1 tablet:ratio169"></span>
      <div className="absolute left-0 top-0 size-full">{children}</div>
    </>
  );
};
