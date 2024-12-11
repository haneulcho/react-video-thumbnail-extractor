import { createBlobUrl } from '@/utils';

/**
 * 현재 재생 중 프레임을 Canvas로 캡쳐, Blob과 Blob URL 생성
 *
 * @param {HTMLVideoElement} player - 현재 프레임을 캡처할 Video Element
 * @param {HTMLCanvasElement} canvas - 프레임을 캡처할 Canvas Element
 * @returns {Promise<{ blob: Blob; blobUrl: string }>} Blob과 Blob URL을 포함하는 객체를 반환하는 Promise
 * @throws {Error} Canvas 초기화 실패 시 에러
 */
export const captureCanvasFrame = async (
  player: HTMLVideoElement,
  canvas: HTMLCanvasElement
): Promise<{ blob: Blob; blobUrl: string }> => {
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas Context 탐색 실패');

  ctx.drawImage(player, 0, 0, canvas.width, canvas.height);

  return createBlobUrl(canvas);
};
