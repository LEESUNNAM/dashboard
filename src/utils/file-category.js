const CATEGORY_MAP = {
  document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'hwp', 'odt', 'ods', 'odp', 'rtf', 'csv', 'md'],
  image:    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'avif'],
  video:    ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'],
  archive:  ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'tgz'],
};

/**
 * 확장자 문자열로 카테고리를 반환한다.
 * @param {string} ext - 소문자 확장자 (점 제외)
 * @returns {'document'|'image'|'video'|'archive'|'folder'|'other'}
 */
export function getCategoryByExtension(ext) {
  const lower = (ext || '').toLowerCase().replace(/^\./, '');
  for (const [cat, exts] of Object.entries(CATEGORY_MAP)) {
    if (exts.includes(lower)) return cat;
  }
  return 'other';
}

/**
 * 파일 객체(File)로부터 카테고리를 반환한다.
 * webkitRelativePath 가 있으면 'folder' 로 표시하지 않고 확장자 기준으로 분류한다.
 * (폴더 카테고리는 folder_path 유무로 별도 필터링)
 * @param {File} file
 * @returns {string}
 */
export function getCategoryByFile(file) {
  const ext = file.name.split('.').pop() || '';
  return getCategoryByExtension(ext);
}

export const CATEGORIES = [
  { key: 'all',      label: '전체보기' },
  { key: 'document', label: '문서' },
  { key: 'image',    label: '이미지' },
  { key: 'video',    label: '영상·음원' },
  { key: 'archive',  label: '압축파일' },
  { key: 'folder',   label: '폴더' },
  { key: 'other',    label: '기타' },
];
