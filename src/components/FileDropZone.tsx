import { useCallback, useRef, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';

import { cn } from '@/utils';

type Props = {
  maxFileSize: number; // 최대 파일 크기 (MB 단위)
  onFileChange: (files: File[]) => void; // 파일 변경 핸들러
  maxFileLength?: number; // 한 번에 선택할 수 있는 최대 파일 개수
  accept?: string; // 허용되는 파일 타입
  label?: string;
  subLabel?: string;
  maxUnitLabel?: string;
};

export const FileDropzone = ({
  maxFileSize,
  maxFileLength = 1,
  onFileChange,
  accept = 'video/*',
  label = '동영상 파일을 선택',
  subLabel = '하거나 이곳으로 드래그 앤 드롭하세요.',
  maxUnitLabel = '최대'
}: Props) => {
  const $fileInput = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetInputValue = () => {
    if ($fileInput.current) {
      $fileInput.current.value = '';
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      resetInputValue();

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileChange(files);
      }
    },
    [onFileChange]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFileChange(files);
      }
    },
    [onFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={cn([
        'relative flex h-[250px] max-h-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-primaryDark text-center text-primaryDark tablet:h-[350px]',
        isDragging ? 'border-solid border-primaryDark bg-blue-200/10' : 'border-dashed',
        'transition-all duration-300 hover:bg-blue-200/10'
      ])}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="form-file-load"
        className="absolute left-0 top-0 flex size-full cursor-pointer flex-col flex-wrap items-center justify-center px-4"
      >
        <AiOutlineDownload
          className={cn(['size-12 transition-all duration-300 tablet:size-14', isDragging && 'scale-110'])}
        />
        <p className="pointer-events-none mt-2 break-words text-slate-600 tablet:mt-3">
          <strong>{label}</strong>
          {subLabel}
        </p>
        <span className="text-xs text-red-400">
          ({maxUnitLabel} {maxFileSize}MB)
        </span>
      </label>
      <input
        ref={$fileInput}
        type="file"
        id="form-file-load"
        accept={accept}
        onChange={handleFileInputChange}
        className="absolute left-0 top-0 z-0 size-full appearance-none opacity-0"
        multiple={maxFileLength > 1}
      />
    </div>
  );
};
