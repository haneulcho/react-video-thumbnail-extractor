# 커스텀 훅 만들기 {#custom-hook}

React Video Thumbnail Extractor의 콜백 handler를 컴포넌트에 매번 삽입하시나요?

`커스텀 훅`을 만들어 보세요. 레이어 팝업과 에디터를 결합한 형식으로 활용한다면 커스텀 훅으로 `isOpen, editorContent` 처럼 자주 쓰는 상태와 에러 처리 코드를 깔끔하게 묶을 수 있습니다. [React Hot Toast](https://react-hot-toast.com/) 와 같은 Notification 라이브러리를 활용해서 더욱 완성도 높은 화면을 구성할 수 있습니다.

**물론, 얼마든지 개발자 취향에 따라 원하는 라이브러리로 대체할 수 있습니다.**

## useEditorHandlers.ts
<<< @/../examples/src/hooks/useEditorHandlers.ts{8,19-38}

