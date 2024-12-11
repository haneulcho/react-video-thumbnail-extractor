import { useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';

import { cn } from '@/utils';

type Props = {
  loading: boolean;
};

export const Loader = ({ loading = false }: Props) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition in={loading} appear timeout={300} unmountOnExit nodeRef={nodeRef} classNames="fade-in">
      <div
        ref={nodeRef}
        className={cn([
          'trans-fade-in',
          'absolute left-0 top-0 z-[50] flex size-full items-center justify-center bg-primary/60',
          loading && 'pointer-events-none',
          `[&.fade-in-enter-done]:pointer-events-auto`,
          `[&.fade-in-enter-done>div]:translate-y-0`,
          `[&.fade-in-enter-done>div]:opacity-100`,
          `[&.fade-in-enter-done>div]:pointer-events-auto`,
          `[&.fade-in-exit-active]:pointer-events-none`,
          `[&.fade-in-exit-active>div]:opacity-0`,
          `[&.fade-in-exit-active>div]:pointer-events-none`
        ])}
      >
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-white tablet:text-5xl" />
      </div>
    </CSSTransition>
  );
};
