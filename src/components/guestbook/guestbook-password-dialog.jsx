import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

/**
 * GuestbookPasswordDialog 컴포넌트
 *
 * Props:
 * @param {boolean}  open        - 다이얼로그 열림 여부 [Required]
 * @param {string}   mode        - 'edit' | 'delete' [Required]
 * @param {function} onClose     - 닫기 콜백 [Required]
 * @param {function} onConfirm   - (password: string) => Promise<string|null> — null이면 성공 [Required]
 *
 * Example usage:
 * <GuestbookPasswordDialog open={open} mode="delete" onClose={handleClose} onConfirm={handleConfirm} />
 */
function GuestbookPasswordDialog({ open, mode, onClose, onConfirm }) {
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const isDelete = mode === 'delete';

  const handleClose = () => {
    if (loading) return;
    setPassword('');
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) { setError('비밀번호를 입력해주세요.'); return; }
    setError('');
    setLoading(true);
    const err = await onConfirm(password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setPassword('');
      setError('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2.5 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        {isDelete
          ? <WarningAmberIcon sx={{ color: 'warning.main' }} />
          : <LockOutlinedIcon sx={{ color: 'var(--color-primary)' }} />
        }
        {isDelete ? '삭제 비밀번호 확인' : '수정 비밀번호 확인'}
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 0.5 }}>
          <Typography sx={{ fontSize: '0.87rem', color: 'var(--color-text-secondary)', mb: 2 }}>
            {isDelete
              ? '삭제하려면 작성 시 설정한 비밀번호를 입력하세요. 삭제 후 복구할 수 없습니다.'
              : '수정하려면 작성 시 설정한 비밀번호를 입력하세요.'
            }
          </Typography>

          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            fullWidth
            size="small"
            autoFocus
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: 'var(--color-primary)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary-dark)' },
            }}
          />

          {error && (
            <Typography sx={{ fontSize: '0.82rem', color: 'error.main', mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={loading}
            sx={{
              borderColor: 'rgba(118,167,216,0.4)',
              color: 'var(--color-text-secondary)',
              '&:hover': { borderColor: 'var(--color-primary)', bgcolor: 'rgba(118,167,216,0.06)' },
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
            sx={isDelete
              ? { bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }
              : { bgcolor: '#818264', '&:hover': { bgcolor: '#4D4E30' } }
            }
          >
            {loading ? '확인 중...' : isDelete ? '삭제' : '확인'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default GuestbookPasswordDialog;
