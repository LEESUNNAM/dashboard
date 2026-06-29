import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getCategoryByFile } from '../utils/file-category';

/**
 * @typedef {{ id: string, name: string, status: 'pending'|'uploading'|'done'|'error', progress: number, error?: string }} UploadItem
 */

/**
 * 한글·특수문자 등 비ASCII 문자를 포함한 경로를 Storage 안전 키로 변환한다.
 * 원본 파일명은 DB original_name 컬럼에 그대로 보존하고,
 * Storage 키에는 UUID 기반 안전 이름을 사용한다.
 *
 * @param {string} fileName  - 원본 파일명 (예: "정샘물.jpg")
 * @param {string} ext       - 소문자 확장자
 * @returns {string}         - Storage용 안전 파일명 (예: "a1b2c3d4.jpg")
 */
function toSafeFileName(fileName, ext) {
  const uuid = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  return ext ? `${uuid}.${ext}` : uuid;
}

/**
 * 폴더 경로의 각 세그먼트를 ASCII 안전 문자로 치환한다.
 * 비ASCII 문자는 16진수 코드로 대체한다.
 *
 * @param {string} path - 원본 폴더 상대 경로 (예: "사진/여름/beach.jpg")
 * @returns {string}
 */
function sanitizePath(path) {
  return path
    .split('/')
    .map((seg) =>
      seg
        .split('')
        .map((ch) => (/[\w.\-]/.test(ch) ? ch : `_${ch.codePointAt(0).toString(16)}`))
        .join('')
    )
    .join('/');
}

/**
 * useUploadFiles 훅
 *
 * 파일/폴더 업로드 진행 상태를 개별 추적하며 Supabase Storage + DB에 저장한다.
 * Storage 경로는 비ASCII 문자를 안전하게 변환하고, 원본 파일명은 DB에 보존한다.
 */
export function useUploadFiles(onAllDone) {
  const [items, setItems] = useState(/** @type {UploadItem[]} */ ([]));
  const [isUploading, setIsUploading] = useState(false);

  const updateItem = useCallback((id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const uploadFiles = useCallback(async (files) => {
    if (!files.length) return;

    const batchId = crypto.randomUUID().replace(/-/g, '').slice(0, 12);

    const newItems = files.map((f) => ({
      id: crypto.randomUUID(),
      name: f.webkitRelativePath || f.name,
      file: f,
      status: 'pending',
      progress: 0,
    }));

    setItems(newItems);
    setIsUploading(true);

    for (const item of newItems) {
      const { file } = item;
      const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
      const category = getCategoryByFile(file);

      /* 폴더 경로 추출 (원본 — DB 저장용) */
      const folderPath = file.webkitRelativePath
        ? file.webkitRelativePath.split('/').slice(0, -1).join('/')
        : null;

      /* Storage 안전 경로: 비ASCII 문자 제거 */
      const safeFileName = toSafeFileName(file.name, ext);
      const safeFolderPath = folderPath ? sanitizePath(folderPath) + '/' : '';
      const storagePath = `uploads/${batchId}/${safeFolderPath}${safeFileName}`;

      updateItem(item.id, { status: 'uploading', progress: 10 });

      /* Storage 업로드 */
      const { error: uploadError } = await supabase.storage
        .from('uploaded-files')
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        updateItem(item.id, { status: 'error', error: uploadError.message });
        continue;
      }

      updateItem(item.id, { progress: 70 });

      /* Public URL */
      const { data: urlData } = supabase.storage
        .from('uploaded-files')
        .getPublicUrl(storagePath);

      /* DB 메타데이터 저장 — original_name에 원본 한글 파일명 보존 */
      const { error: dbError } = await supabase.from('files').insert({
        original_name: file.name,
        storage_path:  storagePath,
        public_url:    urlData?.publicUrl ?? null,
        file_size:     file.size,
        mime_type:     file.type || null,
        extension:     ext,
        category,
        folder_path:   folderPath,
      });

      if (dbError) {
        updateItem(item.id, { status: 'error', error: dbError.message });
        continue;
      }

      updateItem(item.id, { status: 'done', progress: 100 });
    }

    setIsUploading(false);
    onAllDone?.();
  }, [updateItem, onAllDone]);

  const clearItems = useCallback(() => setItems([]), []);

  return { items, isUploading, uploadFiles, clearItems };
}
