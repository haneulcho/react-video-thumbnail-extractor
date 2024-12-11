import { useCallback, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineReload } from 'react-icons/ai';

import { FileDropzone, ThumbnailList, VideoPlayer } from '@/components';
import {
  Button,
  Container,
  FullHeightGrid,
  PageTitle,
  PlusButton,
  StickydBottomActionGroup
} from '@/components/shared';
import { useDebounce, useVideoThumbnails } from '@/hooks';
import { VideoThumbnailExtractorProps } from '@/types';

const VideoThumbnailExtractor = ({
  stepTitle = ['동영상 선택', '사진 올리기'],
  maxFileSize = 300,
  maxThumbnailLength = 4,
  allowedExtensions,
  confirmButtonLabel = '확인',
  cancelButtonLabel = '취소',
  onVideoLoaded = () => {},
  onThumbnailAdded = () => {},
  onThumbnailRemoved = () => {},
  onError = () => {},
  onSuccess = () => {},
  onCancel = () => {}
}: VideoThumbnailExtractorProps) => {
  const {
    videoUrl,
    thumbnails,
    playerRef,
    canvasRef,
    setVideos,
    resetVideos,
    captureThumbnail,
    removeThumbnail,
    clearThumbnails
  } = useVideoThumbnails({
    maxFileSize,
    allowedExtensions,
    onError,
    onThumbnailAdded,
    onThumbnailRemoved
  });

  const [isPending, setIsPending] = useState(false);

  const hasThumbnails = useMemo(() => thumbnails.length > 0, [thumbnails]);
  const canAddThumbnail = useMemo(() => thumbnails.length < maxThumbnailLength, [thumbnails, maxThumbnailLength]);
  const isThumbnailListVisible = useMemo(() => !!videoUrl || hasThumbnails, [videoUrl, hasThumbnails]);
  const title = useMemo(() => (videoUrl ? stepTitle[1] : stepTitle[0]), [videoUrl]);

  const onCaptureClick = useDebounce(async () => {
    if (isPending) return;

    setIsPending(true);
    await captureThumbnail();
    setTimeout(() => {
      setIsPending(false);
    }, 200);
  }, 200);

  const onVideoChange = useCallback(
    (files: File[]) => {
      setVideos(files);
    },
    [setVideos]
  );

  return (
    <FullHeightGrid>
      <Container>
        <PageTitle title={title} />

        {/* 영상 영역 */}
        {videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} playerRef={playerRef} onVideoLoaded={onVideoLoaded} isPending={isPending} />
        ) : (
          <FileDropzone maxFileSize={maxFileSize} onFileChange={onVideoChange} />
        )}

        {/* 컨트롤 버튼 그룹 */}
        <div className="mt-4 flex items-center justify-end gap-1">
          {videoUrl && (
            <Button label="동영상 바꾸기" bg="outline" size="small" onClick={resetVideos}>
              <AiOutlineReload />
            </Button>
          )}
          {isThumbnailListVisible && (
            <Button
              label="썸네일 전체삭제"
              bg="outline"
              size="small"
              disabled={!hasThumbnails}
              onClick={clearThumbnails}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </div>

        {/* 썸네일 리스트 */}
        {isThumbnailListVisible && (
          <ThumbnailList items={thumbnails} onRemove={removeThumbnail}>
            {canAddThumbnail && <PlusButton onClick={onCaptureClick} label="썸네일 추출하기" />}
          </ThumbnailList>
        )}

        {/* 썸네일 추출용 캔버스 */}
        <canvas ref={canvasRef} className="sr-only" />
      </Container>

      {/* 하단 버튼 그룹 */}
      <StickydBottomActionGroup>
        <Button label={cancelButtonLabel} onClick={onCancel} className="min-h-[48px]" />
        <Button
          label={confirmButtonLabel}
          color="dark"
          onClick={() => onSuccess?.(thumbnails)}
          disabled={!hasThumbnails}
          className="min-h-[48px]"
        />
      </StickydBottomActionGroup>
    </FullHeightGrid>
  );
};

export default VideoThumbnailExtractor;
