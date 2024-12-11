import '@devskyui/react-video-thumbnail-extractor/style.css';

import type { Thumbnail, ThumbnailValidationResult } from '@devskyui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractor } from '@devskyui/react-video-thumbnail-extractor';
import { useState } from 'react';

export const DemoInPage = () => {
  const [isModuleVisible, setIsModuleVisible] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const handleSuccess = (thumbnails: Thumbnail[]) => {
    const thumbnailUrls = thumbnails.map((thumbnail) => thumbnail.base64Url);
    setImages(thumbnailUrls);

    // 썸네일 추출 성공 시, 페이지에서 모듈 미노출
    setIsModuleVisible(false);
  };

  const handleError = (result: ThumbnailValidationResult) => {
    console.log(result); // { hasError: true, code: 'INVALID_THUMBNAIL_DUPLICATED' }
  };

  return (
    <>
      <ul className="grid grid-cols-4 gap-2">
        {images.map((url, index) => (
          <li key={`image_${index}`} className="overflow-hidden rounded-md">
            <img src={url} />
          </li>
        ))}
      </ul>
      {isModuleVisible && <VideoThumbnailExtractor onSuccess={handleSuccess} onError={handleError} />}
    </>
  );
};
