# 시작하기 {#getting-started}

다음 명령어를 사용해 React Video Thumbnail Extractor를 설치하세요.

::: code-group

```sh [yarn]
yarn add @devskyui/react-video-thumbnail-extractor
```

```sh [npm]
npm install @devskyui/react-video-thumbnail-extractor
```

```sh [pnpm]
pnpm add @devskyui/react-video-thumbnail-extractor
```

:::

## 기본 사용법

설치를 완료했다면, package.json 파일 `"dependencies":` 목록에 모듈이 추가됩니다.

```json{3}
"dependencies": {
  ...
  "@devskyui/react-video-thumbnail-extractor": "^0.1.0",
  "react-icons": "^5.3.0",
  ...
},
```

컴포넌트에서 React Video Thumbnail Extractor를 import 해서 사용하세요.

```tsx{3-5}
import { useState } from 'react';

import '@devskyui/react-video-thumbnail-extractor/style.css';
import type { Thumbnail } from '@devskyui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractor } from '@devskyui/react-video-thumbnail-extractor';
```

## 레이어 팝업으로 사용하기
다음은 기본적인 사용 예제입니다. `<VideoThumbnailExtractorModal />` 컴포넌트의 `isOpen` 속성에 `true/false` 값을 전달하여 레이어 팝업(모달창) 노출 여부를 제어합니다. 썸네일을 추출한 후 `확인` 버튼을 눌러 썸네일 목록을 리스트에 바로 노출하거나 외부 API와 연동하여 업로드할 수 있습니다.

<<< @/../examples/src/demos/basic/DemoModal.tsx{8,14,31-36}

## 페이지에 바로 노출하기
레이어 팝업 형태가 아닌 페이지에 바로 모듈을 노출하려면 `<VideoThumbnailExtractor />` 컴포넌트를 사용하세요. 아래는 확인 버튼을 누르면 모듈이 사라지고 이미지 목록을 노출하는 간단한 예제입니다.

<<< @/../examples/src/demos/basic/DemoInPage.tsx{8,16,32}
