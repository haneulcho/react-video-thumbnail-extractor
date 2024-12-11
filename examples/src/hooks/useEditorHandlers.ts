import type {
  Thumbnail,
  ThumbnailValidationResult,
  VideoThumbnailExtractorMessagesType
} from '@sky-ui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorMessages } from '@sky-ui/react-video-thumbnail-extractor';
import { useState } from 'react';
import toast from 'react-hot-toast';

const messages: VideoThumbnailExtractorMessagesType['ko'] = VideoThumbnailExtractorMessages.ko;

export const useEditorHandlers = () => {
  const [editorContent, setEditorContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddedThumbnail = (thumbnail: Thumbnail) => {
    const time = thumbnail.displayTime;
    toast.success(`${time} ${messages.THUMBNAIL_ADD_SUCCESS}`);
  };

  const handleRemovedThumbnail = (thumbnail: Thumbnail) => {
    const time = thumbnail.displayTime;
    toast.success(`${time} ${messages.THUMBNAIL_REMOVE_SUCCESS}`);
  };

  const handleSuccess = (_thumbnails: Thumbnail[]) => {
    closeModal();
  };

  const handleError = (result: ThumbnailValidationResult) => {
    const message = messages?.[result?.code];
    if (message) {
      toast.error(message);
    }
  };

  return {
    editorContent,
    setEditorContent,
    isOpen,
    openModal,
    closeModal,
    handleAddedThumbnail,
    handleRemovedThumbnail,
    handleSuccess,
    handleError
  };
};
