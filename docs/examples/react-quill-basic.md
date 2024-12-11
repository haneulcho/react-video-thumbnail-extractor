# 외부 버튼 활용하기 {#react-quill-basic}

## 예제 바로 확인하기
다음 명령어로 프로젝트를 로컬 개발 환경에서 실행하면 예제를 바로 확인할 수 있습니다.

| URL                                                | Description      | Command       |
|----------------------------------------------------|------------------|---------------|
| [`https://localhost:3032`](https://localhost:3032) | 예제 데모 페이지 | `yarn dev`    |
| [`https://localhost:3033/react-video-thumbnail-extractor/`](https://localhost:3033/react-video-thumbnail-extractor/) | 가이드 문서      | `yarn docs`   |

::: code-group

```sh [yarn]
yarn dev
```

```sh [npm]
npm dev
```

```sh [pnpm]
pnpm dev
```

:::

## React Quill 패키지 설치하기
다음 명령어를 사용해 React Quill 에디터 패키지를 설치하세요. 예제에서는 `react-quill-new 패키지 3.3.3 버전` 을 사용합니다.
[React Quill GitHub](https://github.com/VaguelySerious/react-quill)
> 가급적 React 18+를 지원하는 react-quill-new 패키지를 설치해 주세요.

::: code-group

```sh [yarn]
yarn add react-quill-new@3.3.3
```

```sh [npm]
npm install react-quill-new@3.3.3
```

```sh [pnpm]
pnpm add react-quill-new@3.3.3
```

:::

## 예제 코드 소스
> React Quill 패키지의 테마 스타일 파일과 컴포넌트 파일을 함께 import하는 것, 잊지 마세요!

1. onSuccess 콜백 함수에서 받은 썸네일 목록에서 `Base64 URL만 추출한 후에 에디터에 추가`합니다.

```tsx
// ...중략
const handleSuccess = (thumbnails: Thumbnail[]) => {
  // 썸네일 목록 배열에서 React Quill 에디터가 지원하는 Base64 URL만 추출
  const thumbnailUrls = thumbnails.map((thumbnail) => thumbnail.base64Url);

  handleInsertThumbnails(thumbnailUrls);
  closeModal();
};
```

2. Base64 URL만 있는 배열로 `<img>` 태그를 만든 후, 에디터 Value를 설정합니다.

```tsx
const handleInsertThumbnails = (thumbnailUrls: string[]) => {
  if (thumbnailUrls.length < 1) return;

  const imageTags = thumbnailUrls.map((url) => `<p><img src="${url}" /></p><p></p>`).join('');

  setEditorContent((prevContent) => prevContent + imageTags);
};
```

### /react-quill/DemoBasic.tsx
<<< @/../examples/src/demos/react-quill/DemoBasic.tsx{1-3,5-10,17,60,65-69,77-86}
