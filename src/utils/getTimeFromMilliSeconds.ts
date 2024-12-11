/**
 * 밀리초를 시간, 분, 초로 나누어 반환
 * @param {number} duration - 변환할 숫자 (밀리초단위)
 * @return {string}
 */
export const getTimeFromMilliSeconds = (
  duration: number
): {
  hours: number;
  minutes: number;
  seconds: number;
} => {
  if (isNaN(duration) || duration <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.max(Math.floor(duration / 3600), 0),
    minutes: Math.max(Math.floor((duration % 3600) / 60), 0),
    seconds: Math.max(Math.floor((duration % 3600) % 60), 0)
  };
};
