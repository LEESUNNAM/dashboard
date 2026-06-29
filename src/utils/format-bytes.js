/**
 * formatBytes 함수
 *
 * 바이트 단위 숫자를 사람이 읽기 쉬운 문자열(KB, MB 등)로 변환한다.
 *
 * @param {number} bytes - 변환할 바이트 수 [Required]
 *
 * Example usage:
 * formatBytes(1048576) // '1 MB'
 */
export function formatBytes(bytes) {
  if (!bytes) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}
