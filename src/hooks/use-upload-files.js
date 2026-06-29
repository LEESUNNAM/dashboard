import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getCategoryByFile } from '../utils/file-category';

/**
 * @typedef {{ id: string, name: string, status: 'pending'|'uploading'|'done'|'error', progress: number, error?: string }} UploadItem
 */

/**
 * useUploadFiles 훅
 *
 * 파일/폴더 업로드 진행 상태를 개별 추적하며 Supabase Storage + DB에 저장한다.
 */
export function useUploadFiles(onAllDone) {
  const [items, setItems] = useState(/** @type {UploadItem[]} */ ([]));
  const [isUploading, setIsUploading] = useState(false);

  const updateItem = useCallback((id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const uploadFiles = useCallback(async (files) => {
    if (!files.length) return;

    const batchId = crypto.randomUUID();

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
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const category = getCategoryByFile(file);

      /* 폴더 업로드 시 상대 경로 보존 */
      const relativePath = file.webkitRelativePath || file.name;
      const folderPath = file.webkitRelativePath
        ? file.webkitRelativePath.split('/').slice(0, -1).join('/')
        : null;

      const storagePath = `uploads/${batchId}/${relativePath}`;

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

      /* DB 메타데이터 저장 */
      const { error: dbError } = await supabase.from('files').insert({
        original_name:  file.name,
        storage_path:   storagePath,
        public_url:     urlData?.publicUrl ?? null,
        file_size:      file.size,
        mime_type:      file.type || null,
        extension:      ext,
        category,
        folder_path:    folderPath,
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
