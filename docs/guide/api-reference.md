# API Reference {#api-reference}

## Component Props
React Video Thumbnail Extractor는 레이어 팝업형, 페이지형 2가지 UI를 제공합니다. 레이어 팝업형 `VideoThumbnailExtractorModal` 컴포넌트는 `VideoThumbnailExtractorProps` 타입을 온전히 상속하며, `isOpen` 속성을 추가로 가집니다.

### VideoThumbnailExtractorProps

```tsx
<VideoThumbnailExtractor
  stepTitle={['동영상 선택하기', '썸네일 추출하기']}
  maxFileSize={10}
  maxThumbnailLength={4}
  allowedExtensions={['.mp4', '.webm']}
  confirmButtonLabel="확인"
  cancelButtonLabel="취소"
  onVideoLoaded={handleLoaded}
  onThumbnailAdded={handleAddedThumbnail}
  onThumbnailRemoved={handleRemovedThumbnail}
  onError={handleError}
  onSuccess={handleSuccess}
  onCancel={() => closeModal()}
/>
```

| Property            | Description                                                           | Type                             | Default                              |
|---------------------|-----------------------------------------------------------------------|----------------------------------|--------------------------------------|
| stepTitle          | 동영상 업로드 단계와 썸네일 추출 단계에서의 UI 타이틀을 정의합니다.    | `[string, string]`               | `['동영상 업로드', '사진 올리기']` |
| maxFileSize        | 업로드 가능한 동영상 파일의 최대 크기를 지정합니다. **(단위: MB)**    | `number`                         | `300`                               |
| maxThumbnailLength | 생성할 수 있는 썸네일의 최대 개수를 설정합니다.                      | `number`                         | `4`                                  |
| allowedExtensions  | 허용되는 파일 확장자를 정의합니다. (예: `['.mp4', '.mov']`)          | `string[]`                       | `['.mp4', '.webm', '.ogg', '.mov', '.avi', '.flv', '.wmv', '.mkv', '.m4v']` |
| confirmButtonLabel      | 확인 버튼에 표시할 문구를 설정합니다.                           | `string`                         | `확인`             |
| cancelButtonLabel      | 취소 버튼에 표시할 문구를 설정합니다.                            | `string`                         | `취소`             |
| onVideoLoaded      | 동영상을 성공적으로 로드했을 때 호출합니다.                          | `() => void`                     |                    |
| onThumbnailAdded   | 썸네일을 성공적으로 추가했을 때 호출합니다.                          | `(thumbnail: Thumbnail) => void` |                    |
| onThumbnailRemoved | 썸네일을 삭제했을 때 호출합니다.                                     | `(thumbnail: Thumbnail) => void` |                    |
| onError            | 에러 발생 시 호출되며, 에러 코드와 상태 정보를 제공합니다.           | `(result: ThumbnailValidationResult) => void` |       |
| onSuccess          | 사용자가 확인 버튼을 누를 때 호출하며, 생성된 썸네일 목록을 반환합니다. | `(thumbnails: Thumbnail[]) => void` |            |
| onCancel           | 사용자가 취소 버튼을 누를 때 호출합니다.                             | `() => void`                     |                    |

### VideoThumbnailExtractorModalProps

```ts
export interface VideoThumbnailExtractorModalProps extends VideoThumbnailExtractorProps {
  isOpen: boolean;
}
```

```tsx{2}
<VideoThumbnailExtractorModal
  isOpen={true}
  stepTitle={['동영상 선택하기', '썸네일 추출하기']}
  maxFileSize={10}
  maxThumbnailLength={4}
  allowedExtensions={['.mp4', '.webm']}
  confirmButtonLabel="저장하기"
  cancelButtonLabel="취소하기"
  onVideoLoaded={handleLoaded}
  onThumbnailAdded={handleAddedThumbnail}
  onThumbnailRemoved={handleRemovedThumbnail}
  onError={handleError}
  onSuccess={handleSuccess}
  onCancel={() => closeModal()}
/>
```

| Property            | Description                                                           | Type                             | Default          |
|---------------------|-----------------------------------------------------------------------|----------------------------------|----------------- |
| isOpen             | 상태에 따라 `VideoThumbnailExtractorModal` 컴포넌트를 노출합니다.    | `boolean`                        | `false`            |
| 기타 Props | `VideoThumbnailExtractorProps` | `VideoThumbnailExtractor` 컴포넌트의 모든 Props를 상속받습니다.                                     |

## Thumbnail
onSuccess 콜백 함수는 다음과 같이 개별 썸네일의 정보를 담은 목록을 반환합니다. Blob URL 노출을 지원하지 않는 에디터 호환을 위해 Base64 URL을 함께 제공합니다.
모듈 외 영역에서 이 정보를 활용할 수 있습니다.

![result 형식](/images/results.png)

| Property      | Description                                             | Type      |
|---------------|---------------------------------------------------------|-----------|
| `id`          | 각 썸네일의 고유 식별자입니다.                          | `string`  |
| `blobUrl`     | Blob 형태로 제공되는 썸네일 URL입니다.                  | `string`  |
| `base64Url`   | Base64 인코딩된 썸네일 URL입니다.                       | `string`  |
| `file`        | 이미지 업로드를 위한 파일 객체입니다.                   | `File`    |
| `time`        | 동영상에서 썸네일이 추출된 시간(초 단위)입니다.         | `number`  |
| `displayTime` | 썸네일이 생성된 시간을 `HH:MM:SS` 형식으로 표시합니다.  | `string`  |

## ThumbnailValidationResult
동영상을 선택하거나 썸네일을 추출할 때 발생하는 에러 상태를 전달합니다.

| Property    | Description                        | Type                           |
|-------------|------------------------------------|------------------------------- |
| `hasError`  | 에러 발생 여부를 나타냅니다.       | `boolean`                      |
| `code`      | 에러 또는 성공 코드를 반환합니다.  | `VideoThumbnailExtractorCodes` |

## VideoThumbnailExtractorMessagesType
언어 코드를 포함한 메시지 객체로 ThumbnailValidationResult에서 활용합니다.

| Language Code | Description                               | Type                                              |
|---------------|-------------------------------------------|---------------------------------------------------|
| `ko`          | 다국어 메시지의 키-값 형태를 정의합니다.  | `Record<VideoThumbnailExtractorCodes, string>`    |

## Codes

### VideoThumbnailExtractorCodes - Error Codes

| Error Code                     | Description                                                   |
|--------------------------------|---------------------------------------------------------------|
| `REQUIRE_FILE`                 | 파일을 선택해 주세요.                                         |
| `INVALID_FILE`                 | 파일 정보를 찾을 수 없어요. 올바른 파일을 선택해 주세요.      |
| `INVAILD_FILE_NAME`            | 파일명 규칙이 올바르지 않아요. 파일명을 다시 확인해 주세요.   |
| `INVALID_FILE_MAX_LENGTH`      | 첨부 개수를 초과했어요.                                       |
| `INVALID_FILE_MAX_SIZE`        | 첨부 용량을 초과했어요.                                       |
| `INVALID_FILE_EXTENSION`       | 지원하지 않는 파일입니다. 올바른 파일을 선택해 주세요.        |
| `INVALID_FILE_IS_NOT_VIDEO`    | 동영상 파일만 선택할 수 있습니다.                             |
| `INVALID_FILE_ALREADY_EXISTS`  | 이미 선택한 파일입니다.                                       |
| `INVALID_THUMBNAIL_DUPLICATED` | 이미 추출한 장면이에요.                                       |
| `INVALID_THUMBNAIL_MAX_LENGTH` | 썸네일 생성 개수를 초과했어요.                                |
| `THUMBNAIL_EXTRACT_ING`        | 썸네일을 추출하고 있어요. 잠시만 기다려 주세요.               |
| `THUMBNAIL_EXTRACT_FAIL`       | 썸네일 추출 중 오류가 발생했어요.                             |


### VideoThumbnailExtractorCodes - Success Codes

| Success Code                 | Description            |
|------------------------------|------------------------|
| `THUMBNAIL_EXTRACT_SUCCESS`  | 썸네일을 추출했어요.   |
| `THUMBNAIL_ADD_SUCCESS`      | 썸네일을 생성했어요.   |
| `THUMBNAIL_REMOVE_SUCCESS`   | 썸네일을 삭제했어요.   |
| `FILE_IMPORT_SUCCESS`        | 파일을 불러왔어요.     |
