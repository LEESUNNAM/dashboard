import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useFiles 훅
 *
 * files 테이블 전체 목록을 최신순으로 불러오고,
 * 카테고리·검색어·정렬을 클라이언트 사이드에서 필터링한다.
 *
 * @param {{ category: string, search: string, sort: string }} filters
 */
export function useFiles({ category = 'all', search = '', sort = 'newest' } = {}) {
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    supabase
      .from('files')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (ignore) return;
        if (err) {
          setError(err.message);
        } else {
          setAllFiles(data ?? []);
          setError(null);
        }
        setLoading(false);
      });

    return () => { ignore = true; };
  }, [refreshToken]);

  const refetch = useCallback(() => {
    setRefreshToken((t) => t + 1);
  }, []);

  const filtered = allFiles
    .filter((f) => {
      if (category === 'all') return true;
      if (category === 'folder') return !!f.folder_path;
      return f.category === category;
    })
    .filter((f) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        f.original_name?.toLowerCase().includes(q) ||
        f.extension?.toLowerCase().includes(q) ||
        f.folder_path?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case 'oldest':   return new Date(a.uploaded_at) - new Date(b.uploaded_at);
        case 'name_asc': return a.original_name.localeCompare(b.original_name);
        case 'size_desc':return (b.file_size ?? 0) - (a.file_size ?? 0);
        default:         return new Date(b.uploaded_at) - new Date(a.uploaded_at);
      }
    });

  return { files: filtered, totalCount: allFiles.length, loading, error, refetch };
}
