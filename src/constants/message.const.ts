import { VideoThumbnailExtractorMessagesType } from '@/types';

export const MSG: VideoThumbnailExtractorMessagesType = {
  ko: {
    REQUIRE_FILE: `파일을 선택해 주세요.`,
    INVALID_FILE: `파일 정보를 찾을 수 없어요. 올바른 파일을 선택해 주세요.`,
    INVAILD_FILE_NAME: `파일명 규칙이 올바르지 않아요. 파일명을 다시 확인해 주세요.`,
    INVALID_FILE_MAX_LENGTH: `첨부 개수를 초과했어요.`,
    INVALID_FILE_MAX_SIZE: `첨부 용량을 초과했어요.`,
    INVALID_FILE_EXTENSION: `지원하지 않는 파일이에요. 올바른 파일을 선택해 주세요.`,
    INVALID_FILE_IS_NOT_VIDEO: '동영상 파일만 선택할 수 있습니다.',
    INVALID_FILE_ALREADY_EXISTS: `이미 선택한 파일이에요.`,
    INVALID_THUMBNAIL_DUPLICATED: `이미 추출한 장면이에요.`,
    INVALID_THUMBNAIL_MAX_LENGTH: `썸네일 생성 개수를 초과했어요.`,
    THUMBNAIL_EXTRACT_ING: `썸네일을 추출하고 있어요. 잠시만 기다려 주세요.`,
    THUMBNAIL_EXTRACT_FAIL: `썸네일 추출 중 오류가 발생했어요.`,
    THUMBNAIL_EXTRACT_SUCCESS: `썸네일을 추출했어요.`,
    THUMBNAIL_ADD_SUCCESS: `썸네일을 생성했어요.`,
    THUMBNAIL_REMOVE_SUCCESS: `썸네일을 삭제했어요.`,
    FILE_IMPORT_SUCCESS: `파일을 불러왔어요.`
  }
} as const;
