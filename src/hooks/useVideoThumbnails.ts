import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { Thumbnail, ThumbnailValidationResult } from '@/types';
import { convertSecondsToHms } from '@/utils';
import { captureCanvasFrame, convertBlobToBase64 } from '@/utils';
import validateFiles from '@/utils/validateFiles';

const SUPPORTED_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.flv', '.wmv', '.mkv', '.m4v'];

type UseVideoThumbnailsParams = {
  maxFileSize?: number;
  allowedExtensions?: string[];
  onError?: (result: ThumbnailValidationResult) => void;
  onThumbnailAdded?: (thumbnail: Thumbnail) => void;
  onThumbnailRemoved?: (thumbnail: Thumbnail) => void;
};

type UseVideoThumbnailsReturn = {
  videoUrl: string | null;
  thumbnails: Thumbnail[];
  playerRef: React.RefObject<ReactPlayer>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setVideos: (files: File[]) => void;
  resetVideos: () => void;
  captureThumbnail: () => Promise<void>;
  removeThumbnail: (id: string) => void;
  clearThumbnails: () => void;
};

export const useVideoThumbnails = ({
  maxFileSize = 300,
  allowedExtensions = SUPPORTED_EXTENSIONS,
  onError,
  onThumbnailAdded,
  onThumbnailRemoved
}: UseVideoThumbnailsParams): UseVideoThumbnailsReturn => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const capturedTimesRef = useRef<Set<string>>(new Set());

  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPlayer = () => playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;

  const setVideos = useCallback(
    (files: File[]) => {
      const validationResult = validateFiles({
        currentFiles: files,
        maxFileLength: 1,
        maxFileSize: maxFileSize * 1024,
        allowedExtensions
      });

      if (validationResult.hasError) {
        onError?.(validationResult);
        return;
      }

      const url = URL.createObjectURL(files[0]);
      setVideoUrl(url);
    },
    [maxFileSize, onError]
  );

  const addThumbnail = useCallback(
    async ({
      blob,
      blobUrl,
      base64Url,
      currentTime
    }: {
      blob: Blob;
      blobUrl: string;
      base64Url: string;
      currentTime: number;
    }) => {
      const id = `${Math.floor(currentTime * 1000)}-${blob.size}`;
      const formattedTime = convertSecondsToHms(currentTime);

      if (capturedTimesRef.current.has(id)) {
        onError?.({
          hasError: true,
          code: 'INVALID_THUMBNAIL_DUPLICATED'
        });
        return;
      }

      const newThumbnail: Thumbnail = {
        id,
        blobUrl,
        base64Url,
        file: new File([blob], `thumbnail-${id}.png`, { type: 'image/png' }),
        time: currentTime,
        displayTime: formattedTime
      };

      capturedTimesRef.current.add(id);
      setThumbnails((prev) => [...prev, newThumbnail]);
      onThumbnailAdded?.(newThumbnail);
    },
    [onError, onThumbnailAdded]
  );

  const captureThumbnail = useCallback(async () => {
    const player = getPlayer();
    const canvas = canvasRef.current;
    if (!player || !canvas) return;

    if (!player.paused) player.pause();

    try {
      const { blob, blobUrl } = await captureCanvasFrame(player, canvas);
      const base64Url = await convertBlobToBase64(blob);

      addThumbnail({
        blob,
        blobUrl,
        base64Url,
        currentTime: player.currentTime
      });
    } catch (error: unknown) {
      onError?.({ hasError: true, code: 'THUMBNAIL_EXTRACT_FAIL' });
    }
  }, [getPlayer, onError, addThumbnail]);

  const removeThumbnail = (id: string) => {
    const thumbnailToRemove = thumbnails.find((thumbnail) => thumbnail.id === id);
    if (!thumbnailToRemove) return;

    capturedTimesRef.current.delete(thumbnailToRemove.id);
    setThumbnails((prev) => prev.filter((thumbnail) => thumbnail.id !== id));
    onThumbnailRemoved?.(thumbnailToRemove);
  };

  const clearCapturedTimes = () => {
    capturedTimesRef.current.clear();
  };

  const clearThumbnails = useCallback(() => {
    setThumbnails(() => []);
    clearCapturedTimes();
  }, []);

  const resetVideos = useCallback(() => {
    setVideoUrl(null);
  }, []);

  return {
    videoUrl,
    thumbnails,
    playerRef,
    canvasRef,
    setVideos,
    resetVideos,
    captureThumbnail,
    removeThumbnail,
    clearThumbnails
  };
};
