import 'tailwindcss/tailwind.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Demos from './demos/Demos';

const rootContainer = document.getElementById('app-demo');
if (!rootContainer) {
  throw new Error('#app-demo 요소가 없습니다. examples/index.html 파일을 확인해 주세요.');
}
const root = createRoot(rootContainer);

root.render(
  <StrictMode>
    <Demos />
  </StrictMode>
);
