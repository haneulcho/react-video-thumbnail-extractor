import 'react-quill-new/dist/quill.snow.css';
import './style.css';
import '@sky-ui/react-video-thumbnail-extractor/style.css';

import type { Thumbnail } from '@sky-ui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorModal } from '@sky-ui/react-video-thumbnail-extractor';
import { useMemo } from 'react';
import ReactQuill from 'react-quill-new';

import { useEditorHandlers } from '@/hooks';

import { EditorToolbar, formats } from './';

export const DemoAdvanced = () => {
  const {
    editorContent,
    setEditorContent,
    isOpen,
    openModal,
    closeModal,
    handleAddedThumbnail,
    handleRemovedThumbnail,
    handleError
  } = useEditorHandlers();

  const modules = useMemo(
    () => ({
      toolbar: {
        // EditorToolbar.tsx 파일의 root Div id를 삽입
        container: '#quill-toolbar',
        // handler 이름은 EditorToolbar.tsx 파일의 button className에서 ql-을 제외한 값 삽입
        handlers: {
          'video-thumbnail': openModal
        }
      }
    }),
    []
  );

  const handleInsertThumbnails = (thumbnails: Thumbnail[]) => {
    const thumbnailUrls = thumbnails.map((thumbnail) => thumbnail.base64Url);

    if (thumbnails.length < 1) return;
    const imageTags = thumbnailUrls.map((url) => `<p><img src="${url}" /></p><p></p>`).join('');

    setEditorContent((prevContent) => prevContent + imageTags);
  };

  return (
    <>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={editorContent}
        formats={formats}
        modules={modules}
        onChange={setEditorContent}
        placeholder="에디터 툴바에서 동영상에서 썸네일 가져오기를 선택해서 이미지를 삽입해 보세요."
      />

      <VideoThumbnailExtractorModal
        isOpen={isOpen}
        maxFileSize={300}
        maxThumbnailLength={4}
        confirmButtonLabel="에디터에 썸네일 삽입하기"
        cancelButtonLabel="취소"
        onThumbnailAdded={handleAddedThumbnail}
        onThumbnailRemoved={handleRemovedThumbnail}
        onError={handleError}
        onSuccess={(thumbnails: Thumbnail[]) => {
          handleInsertThumbnails(thumbnails);
          closeModal();
        }}
        onCancel={() => closeModal()}
      />
    </>
  );
};
