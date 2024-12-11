import { getTimeFromMilliSeconds } from '@/utils';

/**
 * 재생 시간 초를 01:23:45와 같은 표기로 반환
 * @param {number} time - 변환할 숫자 (초 단위)
 * @return {string}
 */
export const convertSecondsToHms = (time: number): string => {
  if (isNaN(time) || time <= 0) {
    return '00:00';
  }

  const { hours, minutes, seconds } = getTimeFromMilliSeconds(time);

  const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const formattedMinutes = `${minutes.toString().padStart(2, '0')}`;
  const formattedSeconds = `${seconds.toString().padStart(2, '0')}`;

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};
