# @sky-ui/react-video-thumbnail-extractor

> 📌 본 README.md 파일은 프로젝트에 관한 최소한의 내용을 담고 있습니다. 보다 자세한 내용은 `yarn docs`, `yarn dev` 커맨드를 실행하셔서 확인해 주시기 바랍니다.

## 소개

`@sky-ui/react-video-thumbnail-extractor`는 React 기반 프로젝트에서 비디오 파일로부터 썸네일을 손쉽게 추출할 수 있는 컴포넌트입니다. 이 라이브러리는 사용자 경험 향상을 위해 설계되었으며, 커스터마이징 가능한 에러 핸들링, 다국어 지원 메시지, 반응형 디자인을 제공합니다. 또한 간단하고 직관적인 API를 제공합니다.


---

## ⚙️ 주요 기능

- 비디오 파일에서 여러 썸네일 추출 가능
- 가볍고 사용이 간편한 구조
- Modal형 UI와 일반 페이지 내 삽입형 UI 모두 제공
- 반응형 디자인, 스타일 수정이 쉬운 Tailwind CSS 활용
- Blob, Base64 두 가지 방식의 URL 제공
- 다양한 에디터 제약 없이 외부 연동 및 커스터마이징이 쉬운 설계
   - 에디터 용도 외로도 무한 확장 가능
   - 글로벌 대비 에러 핸들링 메시지 지원
- 타입 친화적 프로젝트
---

## 😊 실행 안내
이 프로젝트는 [Yarn Classic (1.22.0 이상)](https://classic.yarnpkg.com/)을 권장합니다.

`yarn`, `npm`, `pnpm` 모두 사용 가능하며, Node.js 20.18.0을 기준으로 제작되었습니다.
각 커맨드를 실행하면 https 환경에서 열리도록 mkcert를 활용하고 있습니다.

| URL                                                | Description      | Command       |
|----------------------------------------------------|------------------|---------------|
| [`https://localhost:3032`](https://localhost:3032) | 예제 데모 페이지 | `yarn dev`    |
| [`https://localhost:3033`](https://localhost:3033) | 가이드 문서      | `yarn docs`   |

### 1. 패키지 설치
node -v 커맨드로 Node.js 버전을 확인 후 실행해 주세요.
```bash
# yarn 설치
npm install -g yarn

# 실행에 필요한 패키지 설치
yarn install
```

### 2. 데모 App 실행
```bash
yarn dev
```

### 3. 가이드 문서 열람
기능 정의, Props 타입에 관한 내용은 아래 문서에서 확인해 주세요.
```bash
yarn docs
```

### 4. 모듈 빌드
배포하기 위한 파일을 빌드합니다. `/src` 폴더 내 파일을 기반으로 `/dist` 파일에 빌드 산출물을 저장합니다. ESM, CommonJS를 모두 지원합니다.

```bash
yarn build
```

```
dist/
├── types/
│   └── index.d.ts
├── style.css
├── react-video-thumbnail-extractor.es.js
├── react-video-thumbnail-extractor.umd.js
```
---

## 📂 폴더 구조 안내

### /docs
React에서 동영상 썸네일 추출 모듈을 사용하는 방법을 담은 가이드 문서 소스입니다. [VitePress](https://vitepress.dev/)를 활용했습니다.

### /examples
React 프로젝트 개발 시 `@sky-ui/react-video-thumbnail-extractor` 모듈을 설치했다는 가정 하에 참고할 수 있는 예제 코드입니다. 예제용 에디터와 에러 메시지 노출 라이브러리로 [React Quill](https://github.com/VaguelySerious/react-quill), [React Hot Toast](https://react-hot-toast.com/)를 활용했습니다.

### /src
동영상 썸네일 추출 모듈 `@sky-ui/react-video-thumbnail-extractor` 의 코어 소스입니다. 비디오 플레이어, 스타일링에 [React Player](https://github.com/cookpete/react-player), [Tailwind CSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/)를 활용했습니다.

- `yarn dev` 커맨드로 개발 환경에서 예제를 실행한 후, src 폴더 내 모듈 코어 소스를 수정하면 examples 폴더의 예제에 즉시 반영됩니다.

- 빌드하여 NPM 또는 사내 Artifactory에 배포한 후, 다음처럼 개발할 때 import하여 사용할 수 있습니다.

```typescript
// examples/src/demos/DemoAdvanced.tsx 파일 일부
import type { Thumbnail, ThumbnailValidationResult } from '@sky-ui/react-video-thumbnail-extractor';
import { VideoThumbnailExtractorMessages, VideoThumbnailExtractorModal } from '@sky-ui/react-video-thumbnail-extractor';

export const DemoAdvanced = () => {
  // ... 생략
  return (
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
  )
}
```

---

> 최종 수정일: 2024. 12. 11(수)

###### Copyright © 2024-present [Haneul Cho](https://github.com/haneulcho/)
