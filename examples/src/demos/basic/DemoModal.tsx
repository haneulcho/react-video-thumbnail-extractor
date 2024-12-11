import '@devskyui/react-video-thumbnail-extractor/style.css';

import type { Thumbnail, ThumbnailValidationResult } from '@devskyui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorModal } from '@devskyui/react-video-thumbnail-extractor';
import { useState } from 'react';

export const DemoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleSuccess = (thumbnails: Thumbnail[]) => {
    const thumbnailUrls = thumbnails.map((thumbnail) => thumbnail.base64Url);
    setImages(thumbnailUrls);
    setIsOpen(false);
  };

  const handleError = (result: ThumbnailValidationResult) => {
    console.log(result); // { hasError: true, code: 'INVALID_THUMBNAIL_DUPLICATED' }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>동영상에서 썸네일 모듈 열기</button>
      <ul className="grid grid-cols-4 gap-2">
        {images.map((url, index) => (
          <li key={`image_${index}`} className="overflow-hidden rounded-md">
            <img src={url} />
          </li>
        ))}
      </ul>
      <VideoThumbnailExtractorModal
        isOpen={isOpen}
        onError={handleError}
        onSuccess={handleSuccess}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};
