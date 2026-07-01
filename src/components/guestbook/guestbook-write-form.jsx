import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

const INPUT_SX = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: '#76A7D8' },
    '&.Mui-focused fieldset': { borderColor: '#76A7D8' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#537597' },
};

/**
 * GuestbookWriteForm 컴포넌트
 *
 * Props:
 * @param {function} onSubmit     - ({ author, message, password }) => Promise<string|null> [Required]
 * @param {string}   defaultAuthor - 기본 작성자명 (로그인 유저 이메일 접두어) [Optional]
 *
 * Example usage:
 * <GuestbookWriteForm onSubmit={createEntry} defaultAuthor="홍길동" />
 */
function GuestbookWriteForm({ onSubmit, defaultAuthor = '' }) {
  const [author,   setAuthor]   = useState(defaultAuthor);
  const [password, setPassword] = useState('');
  const [message,  setMessage]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const err = await onSubmit({ author: author.trim(), message: message.trim(), password });
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setMessage('');
      setPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 2.5, md: 3 },
        mb: 3,
        borderRadius: 2.5,
        boxShadow: '0 2px 12px rgba(83,117,151,0.10)',
        border: '1px solid rgba(118,167,216,0.18)',
      }}
    >
      <Typography
        sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', mb: 2 }}
      >
        방명록 작성
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="이름"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          size="small"
          inputProps={{ maxLength: 20 }}
          sx={{ ...INPUT_SX, flex: 1 }}
        />
        <TextField
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size="small"
          helperText="수정·삭제 시 필요합니다"
          autoComplete="new-password"
          sx={{ ...INPUT_SX, flex: 1 }}
        />
      </Box>

      <TextField
        label="내용"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        multiline
        minRows={3}
        maxRows={8}
        fullWidth
        inputProps={{ maxLength: 1000 }}
        helperText={`${message.length} / 1000`}
        sx={{ ...INPUT_SX, mb: 2 }}
      />

      {error && (
        <Typography sx={{ fontSize: '0.82rem', color: 'error.main', mb: 1.5 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography sx={{ fontSize: '0.82rem', color: 'success.main', mb: 1.5 }}>
          방명록이 등록되었습니다!
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          sx={{
            bgcolor: '#818264',
            color: 'white',
            fontWeight: 600,
            px: 3,
            borderRadius: 2,
            '&:hover': { bgcolor: '#4D4E30' },
            '&:disabled': { bgcolor: 'rgba(129,130,100,0.45)', color: 'rgba(255,255,255,0.7)' },
          }}
        >
          {loading ? '등록 중...' : '등록'}
        </Button>
      </Box>
    </Card>
  );
}

export default GuestbookWriteForm;
