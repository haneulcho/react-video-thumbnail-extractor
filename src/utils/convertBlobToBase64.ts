/**
 * Blob 데이터를 Base64로 변환
 *
 * @param {Blob} blob - 변환할 Blob 객체
 * @returns {Promise<string>} Base64로 인코딩된 문자열을 반환하는 Promise
 */
export const convertBlobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
