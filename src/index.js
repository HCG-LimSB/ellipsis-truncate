/**
 * Built-in ellipsis presets.
 *
 * @example
 * import { truncateByChar, ELLIPSIS } from 'ellipsis-truncate';
 * truncateByChar('Hello, world!', 5, ELLIPSIS.UNICODE); // 'Hello…'
 * truncateByChar('Hello, world!', 5, ELLIPSIS.ARROW);   // 'Hello>>'
 */
export const ELLIPSIS = {
  DOT: '...',      // default
  UNICODE: '…',    // single unicode character (1 char, 3 bytes)
  ARROW: '>>',
  BRACKET: '[...]',
  DASH: '--',
  SPACE: ' ',
  EMPTY: '',
};

/**
 * 문자 수 기준 자르기
 * @param {string} text
 * @param {number} maxLength
 * @param {string} ellipsis
 */
export const truncateByChar = (text, maxLength, ellipsis = ELLIPSIS.DOT) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + ellipsis;
};

/**
 * 바이트 기준 자르기 (멀티바이트 문자 지원)
 * @param {string} text
 * @param {number} maxBytes
 * @param {string} ellipsis
 */
export const truncateByByte = (text, maxBytes, ellipsis = ELLIPSIS.DOT) => {
  if (!text) return '';
  const encoder = new TextEncoder();
  if (encoder.encode(text).length <= maxBytes) return text;

  let result = '';
  let byteCount = 0;
  const ellipsisBytes = encoder.encode(ellipsis).length;

  for (const char of text) {
    const charBytes = encoder.encode(char).length;
    if (byteCount + charBytes + ellipsisBytes > maxBytes) break;
    result += char;
    byteCount += charBytes;
  }

  return result + ellipsis;
};

/**
 * 단어 단위 자르기 (단어 중간에 안 잘림)
 * @param {string} text
 * @param {number} maxLength
 * @param {string} ellipsis
 */
export const truncateByWord = (text, maxLength, ellipsis = ELLIPSIS.DOT) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');

  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + ellipsis;
};

/**
 * 옵션을 한 번 바인딩해두고 재사용하는 truncator 팩토리.
 *
 * @param {{ mode?: 'char' | 'byte' | 'word', ellipsis?: string }} options
 * @returns {(text: string, max: number) => string}
 *
 * @example
 * const truncate = createTruncator({ mode: 'word', ellipsis: ELLIPSIS.ARROW });
 * truncate('Hello world foo bar', 12); // 'Hello world>>'
 * truncate('Another long sentence here', 10); // 'Another>>'
 */
export const createTruncator = ({ mode = 'char', ellipsis = ELLIPSIS.DOT } = {}) => {
  const fn = { char: truncateByChar, byte: truncateByByte, word: truncateByWord }[mode];
  if (!fn) throw new Error(`Unknown mode: "${mode}". Use 'char', 'byte', or 'word'.`);
  return (text, max) => fn(text, max, ellipsis);
};
