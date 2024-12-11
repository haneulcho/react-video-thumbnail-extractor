import 'react-quill-new/dist/quill.snow.css';
import './style.css';
import '@sky-ui/react-video-thumbnail-extractor/style.css';

import type {
  Thumbnail,
  ThumbnailValidationResult,
  VideoThumbnailExtractorMessagesType
} from '@sky-ui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorMessages, VideoThumbnailExtractorModal } from '@sky-ui/react-video-thumbnail-extractor';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import ReactQuill from 'react-quill-new';

const messages: VideoThumbnailExtractorMessagesType['ko'] = VideoThumbnailExtractorMessages.ko;

export const DemoBasic = () => {
  const [editorContent, setEditorContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddedThumbnail = (thumbnail: Thumbnail) => {
    const time = thumbnail.displayTime;
    toast.success(`${time} ${messages.THUMBNAIL_ADD_SUCCESS}`);
  };

  const handleRemovedThumbnail = (thumbnail: Thumbnail) => {
    const time = thumbnail.displayTime;
    toast.success(`${time} ${messages.THUMBNAIL_REMOVE_SUCCESS}`);
  };

  const handleSuccess = (thumbnails: Thumbnail[]) => {
    const thumbnailUrls = thumbnails.map((thumbnail) => thumbnail.base64Url);

    handleInsertThumbnails(thumbnailUrls);
    closeModal();
  };

  const handleError = (result: ThumbnailValidationResult) => {
    const message = messages?.[result?.code];
    if (message) {
      toast.error(message);
    }
  };

  const handleInsertThumbnails = (thumbnailUrls: string[]) => {
    if (thumbnailUrls.length < 1) return;

    const imageTags = thumbnailUrls.map((url) => `<p><img src="${url}" /></p><p></p>`).join('');

    setEditorContent((prevContent) => prevContent + imageTags);
  };

  return (
    <>
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        placeholder="에디터 밖 버튼을 눌러 이미지를 삽입해 보세요."
      />
      <button
        onClick={() => openModal()}
        className="mt-2.5 flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-primaryDark transition-colors duration-300 hover:bg-primaryDark hover:text-white"
      >
        <AiOutlineVideoCameraAdd />
        <span className="text-xs font-bold">동영상에서 썸네일 가져오기</span>
      </button>
      <VideoThumbnailExtractorModal
        isOpen={isOpen}
        maxFileSize={300}
        maxThumbnailLength={4}
        onThumbnailAdded={handleAddedThumbnail}
        onThumbnailRemoved={handleRemovedThumbnail}
        onError={handleError}
        onSuccess={handleSuccess}
        onCancel={() => closeModal()}
      />
    </>
  );
};
