import { AiOutlineClose } from 'react-icons/ai';

import { Button, SquareBox } from '@/components/shared';
import { Thumbnail } from '@/types';

type Props = {
  item: Thumbnail;
  onRemove: (id: string) => void;
};

export const ThumbnailListItem = ({ item, onRemove }: Props) => {
  return (
    <li className="group relative size-full overflow-hidden rounded-md">
      <SquareBox>
        <img src={item.base64Url} alt={item.file.name} className="size-full border border-gray-300 object-cover" />
        <span className="absolute bottom-1 right-1 flex items-center justify-center rounded-sm bg-black/70 px-1 py-0.5 text-[11px] leading-none text-white">
          {item.displayTime}
        </span>
        {item.id}
        <Button
          color="dark"
          className="pointer-events-none absolute right-0 top-0 size-5 bg-primary/70 p-0 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 tablet:size-6"
          onClick={() => onRemove(item.id)}
        >
          <AiOutlineClose className="text-xs text-white tablet:text-sm" />
        </Button>
      </SquareBox>
    </li>
  );
};
