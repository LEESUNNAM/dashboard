import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useGuestbook 훅
 *
 * 방명록 목록 조회 및 작성/수정/삭제 RPC 호출을 담당한다.
 * 비밀번호 검증은 SECURITY DEFINER PostgreSQL 함수에서 bcrypt로 수행된다.
 */
export function useGuestbook() {
  const [entries, setEntries]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState('');

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('guestbook')
      .select('id, author, message, created_at, updated_at')
      .order('created_at', { ascending: false });
    setError(err?.message ?? '');
    setEntries(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  /** 방명록 작성 — 비밀번호는 서버에서 bcrypt 해싱 */
  const createEntry = useCallback(async ({ author, message, password }) => {
    const { error: err } = await supabase.rpc('insert_guestbook_entry', {
      p_author:   author,
      p_message:  message,
      p_password: password,
    });
    if (err) return err.message;
    await fetchEntries();
    return null;
  }, [fetchEntries]);

  /** 비밀번호 검증만 (수정 모드 진입 전 확인) */
  const verifyPassword = useCallback(async (id, password) => {
    const { data, error: err } = await supabase.rpc('verify_guestbook_password', {
      p_id:       id,
      p_password: password,
    });
    if (err) return false;
    return data === true;
  }, []);

  /** 방명록 수정 — 비밀번호 서버 검증 후 메시지 업데이트 */
  const updateEntry = useCallback(async (id, password, newMessage) => {
    const { data, error: err } = await supabase.rpc('update_guestbook_entry', {
      p_id:         id,
      p_password:   password,
      p_new_message: newMessage,
    });
    if (err) return err.message;
    if (!data) return '비밀번호가 올바르지 않습니다.';
    await fetchEntries();
    return null;
  }, [fetchEntries]);

  /** 방명록 삭제 — 비밀번호 서버 검증 후 삭제 */
  const deleteEntry = useCallback(async (id, password) => {
    const { data, error: err } = await supabase.rpc('delete_guestbook_entry', {
      p_id:       id,
      p_password: password,
    });
    if (err) return err.message;
    if (!data) return '비밀번호가 올바르지 않습니다.';
    await fetchEntries();
    return null;
  }, [fetchEntries]);

  return { entries, loading, error, createEntry, verifyPassword, updateEntry, deleteEntry };
}
