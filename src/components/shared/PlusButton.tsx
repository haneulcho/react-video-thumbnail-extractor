import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@/components/shared';
import { cn } from '@/utils';

type Props = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export const PlusButton = ({ onClick, label = '+', className }: Props) => {
  return (
    <div
      className={cn([
        'relative flex h-full w-full items-center justify-center bg-white opacity-70 group-hover:border-2 group-hover:border-primary',
        className
      ])}
    >
      <Button color="light" onClick={onClick} className={cn(['size-full transition-colors duration-300'])}>
        <span className="sr-only">{label}</span>
        <AiOutlinePlus className="text-xl tablet:text-2xl" />
      </Button>
    </div>
  );
};
