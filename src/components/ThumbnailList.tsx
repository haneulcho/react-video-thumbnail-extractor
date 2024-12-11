import { PropsWithChildren } from 'react';

import { SquareBox } from '@/components/shared';
import { Thumbnail } from '@/types';
import { cn, isNotEmpty } from '@/utils';

import { ThumbnailListItem } from './ThumbnailListItem';

type Props = {
  items: Thumbnail[];
  onRemove: (id: string) => void;
  helpMessage?: string;
};

export const ThumbnailList = ({
  items,
  onRemove,
  helpMessage = '+ 버튼을 눌러 썸네일을 추출하세요.',
  children
}: PropsWithChildren<Props>) => {
  const helpMessageVisible = !isNotEmpty(items);

  return (
    <ul
      className={cn([
        'mx-auto mt-3 grid flex-1 grid-cols-4 items-center gap-1 tablet:gap-2',
        helpMessageVisible ? 'grid-cols-1' : 'grid-cols-4'
      ])}
    >
      {items.map((item) => (
        <ThumbnailListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
      {children && (
        <li className={cn(['group relative size-full overflow-hidden rounded-md'])}>
          {helpMessageVisible ? (
            <div className="flex h-24 flex-col justify-center gap-3 text-center tablet:h-32">
              {children} <p className="text-sm font-semibold text-primaryDark">{helpMessage}</p>
            </div>
          ) : (
            <SquareBox>{children}</SquareBox>
          )}
        </li>
      )}
    </ul>
  );
};
