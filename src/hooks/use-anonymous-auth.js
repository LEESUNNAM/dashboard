import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useAnonymousAuth 훅
 *
 * 앱 진입 시 세션이 없으면 익명 로그인을 수행하고
 * 현재 사용자 정보와 로딩 상태를 반환한다.
 *
 * Example usage:
 * const { user, loading } = useAnonymousAuth();
 */
export function useAnonymousAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const ensureSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        if (isMounted) {
          setUser(session.user);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();

      if (isMounted) {
        if (!error) {
          setUser(data.user);
        }
        setLoading(false);
      }
    };

    ensureSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
