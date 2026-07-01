import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import GuestbookWriteForm from '../components/guestbook/guestbook-write-form';
import GuestbookEntryCard from '../components/guestbook/guestbook-entry-card';
import { useGuestbook } from '../hooks/use-guestbook';

/**
 * GuestbookPage 컴포넌트
 *
 * Props:
 * @param {object}   user      - Supabase 인증 유저 객체 [Required]
 * @param {function} onSignOut - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <GuestbookPage user={user} onSignOut={signOut} />
 */
function GuestbookPage({ user, onSignOut }) {
  const { entries, loading, error, createEntry, verifyPassword, updateEntry, deleteEntry } = useGuestbook();

  /* 로그인 이메일에서 @ 앞부분을 기본 작성자명으로 사용 */
  const defaultAuthor = user?.email?.split('@')[0] ?? '';

  return (
    <Box>
      {/* 헤더 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #C5BDD8 0%, #A8B5D9 45%, #76A7D8 100%)',
          borderRadius: 3,
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
          mb: { xs: 3, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
        <Box aria-hidden="true" sx={{ position: 'absolute', bottom: -40, left: '40%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
          <Box
            sx={{
              width: { xs: 48, md: 60 },
              height: { xs: 48, md: 60 },
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 4px rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          >
            <ForumOutlinedIcon sx={{ fontSize: { xs: 26, md: 32 }, color: 'white' }} />
          </Box>
          <Box>
            <Typography
              component="h1"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: 'white', lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
            >
              방명록
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: 'rgba(255,255,255,0.88)', mt: 0.4, lineHeight: 1.5 }}>
              방문하신 분들의 소중한 메시지를 남겨주세요.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            gap: 1,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {user?.email && (
            <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.82)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </Typography>
          )}
          <Tooltip title="로그아웃">
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={onSignOut}
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                color: 'white',
                fontWeight: 500,
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.15)' },
              }}
            >
              로그아웃
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* 작성 폼 */}
      <GuestbookWriteForm onSubmit={createEntry} defaultAuthor={defaultAuthor} />

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(118,167,216,0.18)' }} />

      {/* 목록 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
          방문 메시지
        </Typography>
        {!loading && (
          <Typography sx={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            총 {entries.length}개
          </Typography>
        )}
      </Box>

      {/* 로딩 */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: 'var(--color-primary)' }} />
        </Box>
      )}

      {/* 에러 */}
      {!loading && error && (
        <Typography sx={{ textAlign: 'center', color: 'error.main', py: 6, fontSize: '0.9rem' }}>
          목록을 불러오는 데 실패했습니다: {error}
        </Typography>
      )}

      {/* 빈 상태 */}
      {!loading && !error && entries.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <ForumOutlinedIcon sx={{ fontSize: 56, color: 'rgba(118,167,216,0.35)', mb: 2 }} />
          <Typography sx={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            아직 등록된 방명록이 없습니다.
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', mt: 0.5 }}>
            첫 번째 방문 메시지를 남겨보세요!
          </Typography>
        </Box>
      )}

      {/* 목록 */}
      {!loading && !error && entries.length > 0 && (
        <Stack spacing={2}>
          {entries.map((entry) => (
            <GuestbookEntryCard
              key={entry.id}
              entry={entry}
              onVerifyPw={verifyPassword}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default GuestbookPage;
