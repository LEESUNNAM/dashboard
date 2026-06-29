import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const TEXT_FIELD_SX = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: '#76A7D8' },
    '&.Mui-focused fieldset': { borderColor: '#76A7D8' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#537597' },
};

function toKoreanError(msg) {
  if (!msg) return '알 수 없는 오류가 발생했습니다.';
  if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.';
  if (msg.includes('Email not confirmed')) return '이메일 인증이 필요합니다. 받은 편지함을 확인해주세요.';
  if (msg.includes('User already registered')) return '이미 가입된 이메일입니다. 로그인 탭을 이용해주세요.';
  if (msg.includes('Password should be at least')) return '비밀번호는 6자 이상이어야 합니다.';
  if (msg.includes('rate limit')) return '잠시 후 다시 시도해주세요.';
  return msg;
}

/**
 * LoginPage 컴포넌트
 *
 * Props:
 * @param {function} onSignIn - ({ email, password }) → Error|null [Required]
 * @param {function} onSignUp - ({ email, password }) → Error|null [Required]
 *
 * Example usage:
 * <LoginPage onSignIn={signIn} onSignUp={signUp} />
 */
function LoginPage({ onSignIn, onSignUp }) {
  const [tab, setTab]           = useState(0);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleTabChange = (_, val) => {
    setTab(val);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (tab === 0) {
      const err = await onSignIn({ email, password });
      if (err) setError(toKoreanError(err.message));
    } else {
      const err = await onSignUp({ email, password });
      if (err) {
        setError(toKoreanError(err.message));
      } else {
        setSuccess('가입 완료! 이메일을 확인하여 계정을 활성화하세요.');
        setEmail('');
        setPassword('');
      }
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(83,117,151,0.18)',
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #76A7D8 0%, #9FC1E4 45%, #C5BDD8 100%)',
            px: 4,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box aria-hidden="true" sx={{ position: 'absolute', top: -40, right: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
          <Box aria-hidden="true" sx={{ position: 'absolute', bottom: -30, left: '30%', width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 4px rgba(255,255,255,0.2)',
              position: 'relative',
            }}
          >
            <FolderZipOutlinedIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'white',
              textShadow: '0 1px 4px rgba(0,0,0,0.15)',
              position: 'relative',
            }}
          >
            File Share Hub
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.88)', position: 'relative' }}>
            로그인하여 파일을 관리하세요
          </Typography>
        </Box>

        {/* 탭 */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          sx={{
            borderBottom: '1px solid rgba(118,167,216,0.2)',
            '& .MuiTab-root': { fontWeight: 600 },
            '& .MuiTabs-indicator': { bgcolor: '#76A7D8' },
            '& .Mui-selected': { color: '#537597' },
          }}
        >
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        {/* 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ px: 4, py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            size="small"
            autoComplete="email"
            sx={TEXT_FIELD_SX}
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            size="small"
            autoComplete={tab === 0 ? 'current-password' : 'new-password'}
            inputProps={{ minLength: 6 }}
            helperText={tab === 1 ? '6자 이상 입력해주세요' : undefined}
            sx={TEXT_FIELD_SX}
          />

          {error && (
            <Typography sx={{ fontSize: '0.82rem', color: 'error.main', mt: -0.5 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ fontSize: '0.82rem', color: 'success.main', mt: -0.5 }}>
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading
                ? <CircularProgress size={16} color="inherit" />
                : tab === 0
                ? <LockOutlinedIcon />
                : <PersonAddOutlinedIcon />
            }
            sx={{
              bgcolor: '#818264',
              color: 'white',
              fontWeight: 600,
              py: 1.2,
              borderRadius: 2,
              mt: 0.5,
              '&:hover': { bgcolor: '#4D4E30' },
              '&:disabled': { bgcolor: 'rgba(129,130,100,0.45)', color: 'rgba(255,255,255,0.7)' },
            }}
          >
            {loading ? '처리 중...' : tab === 0 ? '로그인' : '회원가입'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default LoginPage;
