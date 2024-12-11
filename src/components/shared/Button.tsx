import { PropsWithChildren } from 'react';

import { cn } from '@/utils';

type Props = {
  color?: 'light' | 'dark';
  bg?: 'fill' | 'outline';
  size?: 'small' | 'medium';
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  color = 'light',
  bg = 'fill',
  size = 'medium',
  label,
  children,
  onClick,
  disabled = false,
  className
}: PropsWithChildren<Props>) => {
  const styleBySize = {
    small: ['px-2 py-1 text-sm'],
    medium: ['px-4 py-2 text-lg']
  };
  const styleByColor = {
    light: [
      'text-sm text-gray-900 hover:text-black',
      bg === 'fill'
        ? 'border-none bg-gray-200 hover:bg-gray-300'
        : 'rounded-md border border-gray-400 hover:bg-primary hover:border-primary text-opacity-80 hover:text-opacity-100 bg-white/40'
    ],
    dark: [
      'text-primaryDark text-sm font-bold hover:text-white',
      bg === 'fill'
        ? 'border-none bg-primary hover:bg-primaryDark'
        : 'rounded-md border-primary hover:border-primaryDark border'
    ]
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn([
        'flex items-center justify-center gap-1 transition-all duration-500',
        disabled && 'opacity-40 disabled:!pointer-events-none disabled:cursor-not-allowed',
        styleBySize[size],
        styleByColor[color],
        className
      ])}
    >
      {children && <span className="text-lg">{children}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};
