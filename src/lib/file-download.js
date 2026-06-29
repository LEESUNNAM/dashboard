import { supabase } from './supabase';

/**
 * Supabase Storage에서 파일을 다운로드한다.
 * @param {string} storagePath  - storage_path 컬럼 값
 * @param {string} originalName - 저장될 원본 파일명
 * @returns {Promise<string|null>} 에러 메시지 또는 null(성공)
 */
export async function downloadFile(storagePath, originalName) {
  const { data, error } = await supabase.storage
    .from('uploaded-files')
    .download(storagePath);

  if (error) return error.message;

  const blobUrl = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = originalName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
  return null;
}

/**
 * 공개 URL을 통해 직접 다운로드한다.
 * @param {string} storagePath
 * @param {string} originalName
 */
export function downloadFileByPublicUrl(storagePath, originalName) {
  const { data } = supabase.storage
    .from('uploaded-files')
    .getPublicUrl(storagePath);

  const link = document.createElement('a');
  link.href = data.publicUrl;
  link.download = originalName;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
