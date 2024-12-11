type ERROR_CODES =
  | 'REQUIRE_FILE'
  | 'INVALID_FILE'
  | 'INVAILD_FILE_NAME'
  | 'INVALID_FILE_MAX_LENGTH'
  | 'INVALID_FILE_MAX_SIZE'
  | 'INVALID_FILE_EXTENSION'
  | 'INVALID_FILE_IS_NOT_VIDEO'
  | 'INVALID_FILE_ALREADY_EXISTS'
  | 'INVALID_THUMBNAIL_DUPLICATED'
  | 'INVALID_THUMBNAIL_MAX_LENGTH'
  | 'THUMBNAIL_EXTRACT_ING'
  | 'THUMBNAIL_EXTRACT_FAIL';

type SUCCESS_CODES =
  | 'THUMBNAIL_EXTRACT_SUCCESS'
  | 'THUMBNAIL_ADD_SUCCESS'
  | 'THUMBNAIL_REMOVE_SUCCESS'
  | 'FILE_IMPORT_SUCCESS';

export type VideoThumbnailExtractorCodes = ERROR_CODES | SUCCESS_CODES;

export type VideoThumbnailExtractorLanguageType = 'ko';

export type VideoThumbnailExtractorMessagesType = Record<
  VideoThumbnailExtractorLanguageType,
  Record<VideoThumbnailExtractorCodes, string>
>;

export interface ThumbnailValidationResult {
  hasError: boolean;
  code: VideoThumbnailExtractorCodes;
}

export interface Thumbnail {
  id: string;
  blobUrl: string;
  base64Url: string;
  file: File;
  time: number;
  displayTime: string;
}

export interface VideoThumbnailExtractorProps {
  stepTitle?: [string, string];
  maxFileSize?: number;
  maxThumbnailLength?: number;
  allowedExtensions?: string[];
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onVideoLoaded?: () => void;
  onThumbnailAdded?: (thumbnail: Thumbnail) => void;
  onThumbnailRemoved?: (thumbnail: Thumbnail) => void;
  onError?: (result: ThumbnailValidationResult) => void;
  onSuccess?: (thumbnails: Thumbnail[]) => void;
  onCancel?: () => void;
}

export interface VideoThumbnailExtractorModalProps extends VideoThumbnailExtractorProps {
  isOpen: boolean;
}
