import { useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';

import { VideoThumbnailExtractorModalProps } from '@/types';
import { cn } from '@/utils';

import VideoThumbnailExtractor from './VideoThumbnailExtractor';

const VideoThumbnailExtractorModal = ({ isOpen, ...props }: VideoThumbnailExtractorModalProps) => {
  const nodeRef = useRef(null);

  const handleCancel = useCallback(() => {
    props?.onCancel?.();
  }, [props]);

  const modalContent = useMemo(() => {
    return (
      <CSSTransition in={isOpen} appear timeout={300} unmountOnExit nodeRef={nodeRef} classNames="fade-in">
        <div
          ref={nodeRef}
          id="react-video-thumbnail-extractor-modal"
          className={cn([
            'trans-fade-in',
            'fixed inset-0 z-[999] flex items-center justify-center bg-black/80',
            `[&.fade-in-enter-done]:pointer-events-auto`,
            `[&.fade-in-enter-done>div]:translate-y-0`,
            `[&.fade-in-enter-done>div]:opacity-100`,
            `[&.fade-in-enter-done>div]:pointer-events-auto`,
            `[&.fade-in-exit-active]:pointer-events-none`,
            `[&.fade-in-exit-active>div]:opacity-0`,
            `[&.fade-in-exit-active>div]:pointer-events-none`
          ])}
        >
          <button
            type="button"
            className="group absolute right-3 top-3 z-[2] hidden items-center justify-center border-none pc:block"
            onClick={() => handleCancel()}
          >
            <AiOutlineClose className="size-10 text-primary transition-colors duration-300 group-hover:text-white" />
            <span className="sr-only">창닫기</span>
          </button>
          <div className="scrollbar z-[1] flex size-full max-h-full items-center justify-center overflow-y-auto">
            <div className="m-auto w-full px-5 py-8">
              <div className="relative mx-auto min-w-80 max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
                <VideoThumbnailExtractor {...props} onCancel={handleCancel} />
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }, [isOpen, props, handleCancel]);

  return ReactDOM.createPortal(modalContent, document.body);
};

export default VideoThumbnailExtractorModal;
