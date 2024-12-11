/**
 * Canvas에서 Blob과 Blob URL 생성
 *
 * @param {HTMLCanvasElement} canvas - Blob을 생성할 Canvas Element
 * @returns {Promise<{ blob: Blob; blobUrl: string }>} Blob과 Blob URL을 객체를 반환하는 Promise
 * @throws {Error} Blob 생성에 실패 시, 에러
 */
export const createBlobUrl = async (canvas: HTMLCanvasElement): Promise<{ blob: Blob; blobUrl: string }> => {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Blob 생성 실패');
  const blobUrl = URL.createObjectURL(blob);
  return { blob, blobUrl };
};
