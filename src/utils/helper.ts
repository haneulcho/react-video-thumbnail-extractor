/**
 * value가 객체인지 확인하여 true/false 반환
 * @param {unknown} val - 확인할 값
 * @return {boolean}
 */
export const isObject = <T = Record<string, unknown> | object>(val: T): val is { [K in keyof T]: T[K] } => {
  return val !== null && typeof val === 'object' && val.constructor === Object;
};

/**
 * value가 비어있지 않은 문자열인지 확인하여 true/false 반환
 * @param {string} str - 확인할 문자열
 * @return {boolean}
 */
export const isNotEmptyString = (str: unknown): str is string => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return str.trim().length > 0;
};

/**
 * value가 비어있는지 확인하여 true/false 반환
 * isNotEmptyString은 문자열에 대해서만 검증, isEmpty는 문자열, 객체, 배열 등 검증
 * @param {unknown} val - 확인할 값
 * @return {boolean}
 */
export const isEmpty = (val: unknown): val is never => {
  if (val === null || val === undefined || typeof val === 'undefined') {
    return true;
  }
  if (val === 0) {
    return false;
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  } else if (typeof val === 'object') {
    return isObject(val) && Object.keys(val).length === 0;
  } else if (typeof val === 'string') {
    return !isNotEmptyString(val);
  } else if (!val) {
    return true;
  }
  return false;
};

/**
 * value가 비어있지 않은지 확인하여 true/false 반환
 * @param {unknown} val - 확인할 값
 * @return {boolean}
 */
export const isNotEmpty = <T>(val: T): val is NonNullable<T> => {
  return !isEmpty(val);
};
