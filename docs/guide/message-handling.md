# 메시지 활용하기 {#message-handling}

React Video Thumbnail Extractor는 다양한 상황에 유연하게 대응하기 위해 상태별 메시지 코드를 제공합니다. 문자열 대신 상태 코드를 전달하여 클라이언트에서 메시지를 쉽게 커스터마이징할 수 있으며, 상태 코드를 바탕으로 모듈 업데이트 없이 직접 다국어 처리가 가능합니다.

## 메시지 그대로 사용하기

컴포넌트에서 React Video Thumbnail Extractor의 메시지를 import 해서 사용하세요.

```tsx{6,8}
import { useState } from 'react';

import type {
  Thumbnail,
  ThumbnailValidationResult,
  VideoThumbnailExtractorMessagesType
} from '@sky-ui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorMessages } from '@sky-ui/react-video-thumbnail-extractor';

const messages: VideoThumbnailExtractorMessagesType['ko'] = VideoThumbnailExtractorMessages.ko;

console.log(messages.THUMBNAIL_ADD_SUCCESS) // 썸네일을 생성했어요.
```

## 메시지 코드로 다국어 대응하기

```tsx{5,10-11}
// ... import 생략
const messages: VideoThumbnailExtractorMessagesType['ko'] = VideoThumbnailExtractorMessages.ko;

const MY_CUSTOM_MESSAGE = {
  INVALID_THUMBNAIL_DUPLICATED: 'The same scene already exists. 🥲'
};

const handleError = (result: ThumbnailValidationResult) => {
  if (result?.code === 'INVALID_THUMBNAIL_DUPLICATED') {
    // 'The same scene already exists. 🥲' - 커스텀 메시지
    console.log(MY_CUSTOM_MESSAGE[result?.code]);
  } else {
    // '이미 추출한 장면이에요.' - 모듈에 있는 ko 기본 메시지
    console.log(messages[result.code]);
  }
};
```

### `@sky-ui/react-video-thumbnail-extractor` message.const.ts
<<< @/../src/constants/message.const.ts
