import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useImages 훅
 *
 * images 테이블의 전체 목록을 최신순으로 조회하고,
 * 업로드/삭제 후 다시 불러올 수 있는 refetch 함수를 제공한다.
 *
 * Example usage:
 * const { images, loading, refetch } = useImages();
 */
export function useImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let ignore = false;

    supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (ignore) return;
        if (!error) {
          setImages(data);
        }
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [refreshToken]);

  const refetch = useCallback(() => {
    setRefreshToken((token) => token + 1);
  }, []);

  return { images, loading, refetch };
}
