# Toolbar에 연동하기 {#react-quill-advanced}

[외부 버튼 활용하기](/examples/react-quill-basic.html) 가이드 절차에 따라 `react-quill-new 패키지 3.3.3 버전`을 설치해 주세요.

## 예제 코드 소스
> React Quill 패키지의 테마 스타일 파일과 컴포넌트 파일을 함께 import하는 것, 잊지 마세요!

1. [가이드 - 더 나아가기 - 커스텀 훅 만들기](/guide/custom-hook)를 참고하여 `useEditorHandlers()` 훅을 생성합니다.

2. `EditorToolbar.tsx` 파일을 생성하고, 원하는 대로 ToolBar를 구성합니다. 단, 사전에 설정되지 않은 ToolBar 항목은 반드시 toolbar 속성에 추가해야 합니다.

```tsx
<span className="ql-formats">
  <button className="ql-video-thumbnail !flex !w-auto items-center">
    <AiOutlineVideoCameraAdd />
    <span className="ml-1 text-xs font-bold text-primaryDark underline underline-offset-2 hover:text-indigo-800">
      동영상에서 썸네일 가져오기
    </span>
  </button>
</span>
```

3. `<ReactQuill />` 컴포넌트와 2번에서 만든 `<EditorToolbar />` 컴포넌트를 삽입합니다. formats, modules를 지정하여 React Video Thumbnail Extractor와 연동합니다. `useEditorHandlers()` 훅의 `openModal` 메서드는 2번에서 만든 Toolbar 버튼을 클릭했을 때, 실행됩니다.

4. modules를 `useMemo()` 훅으로 감싸서 `openModal` 헨들러로 인해 발생하는 에디터의 불필요한 리렌더링을 방지합니다.

```tsx
import { EditorToolbar, formats } from 'EditorToolbar';

// ...중략
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

// ...중략
<EditorToolbar />
<ReactQuill
  theme="snow"
  value={editorContent}
  formats={formats}
  modules={modules}
  onChange={setEditorContent}
  placeholder="에디터 툴바에서 동영상에서 썸네일 가져오기를 선택해서 이미지를 삽입해 보세요."
/>
```

### /react-quill/EditorToolbar.tsx
<<< @/../examples/src/demos/react-quill/EditorToolbar.tsx{50-58}

### /react-quill/DemoAdvanced.tsx
<<< @/../examples/src/demos/react-quill/DemoAdvanced.tsx{1-2,4-5,7,25-37,45,50-58,60-74}
