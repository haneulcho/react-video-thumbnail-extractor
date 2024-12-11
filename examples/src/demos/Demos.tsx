import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { DemoInPage } from '@/demos/basic';
import { DemoAdvanced, DemoBasic } from '@/demos/react-quill';

type DemoBoxProps = {
  title?: string;
};

const DemoBox = ({ children, title }: PropsWithChildren<DemoBoxProps>) => {
  return (
    <div className="w-[90vw] max-w-[900px] space-y-3 tablet:w-[80vw]">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="overflow-hidden rounded-xl bg-white p-4 shadow-lg">{children}</div>
    </div>
  );
};

const Demos = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-8 tablet:px-8">
      <h1 className="bg-gradient-to-r from-primary to-white bg-clip-text text-center text-4xl font-extrabold text-transparent">
        React Thumbnail Extractor Demo
      </h1>

      <div className="mt-12 space-y-8">
        <DemoBox title="✅ 에디터 밖에서 팝업 제어하기">
          <DemoBasic />
        </DemoBox>
        <DemoBox title="✅ 에디터 툴바에서 팝업 제어하기">
          <DemoAdvanced />
        </DemoBox>
        <DemoBox title="✅ 페이지 내에서 모듈 사용하기">
          <DemoInPage />
        </DemoBox>
        <Toaster gutter={5} toastOptions={{ duration: 2000 }} />
      </div>
      <p className="mt-4 text-xs text-white/80">
        Copyright © 2024-present <strong>Haneul Cho</strong>
      </p>
    </div>
  );
};

export default Demos;
