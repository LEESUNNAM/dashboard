import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import GuestbookPasswordDialog from './guestbook-password-dialog';

function formatDate(iso) {
  return new Date(iso).toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

/**
 * GuestbookEntryCard 컴포넌트
 *
 * Props:
 * @param {object}   entry          - guestbook row (id, author, message, created_at, updated_at) [Required]
 * @param {function} onVerifyPw     - (id, password) => Promise<boolean> [Required]
 * @param {function} onUpdate       - (id, password, newMessage) => Promise<string|null> [Required]
 * @param {function} onDelete       - (id, password) => Promise<string|null> [Required]
 *
 * Example usage:
 * <GuestbookEntryCard entry={entry} onVerifyPw={verifyPassword} onUpdate={updateEntry} onDelete={deleteEntry} />
 */
function GuestbookEntryCard({ entry, onVerifyPw, onUpdate, onDelete }) {
  const [mode,            setMode]            = useState('view'); // 'view' | 'edit'
  const [editMessage,     setEditMessage]     = useState(entry.message);
  const [verifiedPw,      setVerifiedPw]      = useState('');
  const [saving,          setSaving]          = useState(false);
  const [saveError,       setSaveError]       = useState('');

  const [pwDialogOpen,    setPwDialogOpen]    = useState(false);
  const [pwDialogMode,    setPwDialogMode]    = useState('edit'); // 'edit' | 'delete'

  const isEdited = entry.updated_at !== entry.created_at;

  /* --- 수정 버튼 → 비밀번호 다이얼로그 열기 --- */
  const handleEditClick = () => {
    setPwDialogMode('edit');
    setPwDialogOpen(true);
  };

  /* --- 삭제 버튼 → 비밀번호 다이얼로그 열기 --- */
  const handleDeleteClick = () => {
    setPwDialogMode('delete');
    setPwDialogOpen(true);
  };

  /* --- 다이얼로그 확인 --- */
  const handlePwConfirm = async (password) => {
    if (pwDialogMode === 'edit') {
      const ok = await onVerifyPw(entry.id, password);
      if (!ok) return '비밀번호가 올바르지 않습니다.';
      setVerifiedPw(password);
      setEditMessage(entry.message);
      setPwDialogOpen(false);
      setMode('edit');
      return null;
    }

    if (pwDialogMode === 'delete') {
      const err = await onDelete(entry.id, password);
      if (err) return err;
      setPwDialogOpen(false);
      return null;
    }

    return null;
  };

  /* --- 수정 저장 --- */
  const handleSave = async () => {
    if (!editMessage.trim()) return;
    setSaveError('');
    setSaving(true);
    const err = await onUpdate(entry.id, verifiedPw, editMessage.trim());
    setSaving(false);
    if (err) {
      setSaveError(err);
    } else {
      setMode('view');
      setVerifiedPw('');
    }
  };

  /* --- 수정 취소 --- */
  const handleCancel = () => {
    setMode('view');
    setEditMessage(entry.message);
    setVerifiedPw('');
    setSaveError('');
  };

  return (
    <>
      <Card
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: 2.5,
          boxShadow: '0 2px 10px rgba(83,117,151,0.09)',
          border: '1px solid rgba(118,167,216,0.15)',
          transition: 'box-shadow 0.15s',
          '&:hover': { boxShadow: '0 4px 18px rgba(83,117,151,0.15)' },
        }}
      >
        {/* 상단: 작성자 + 날짜 + 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'rgba(118,167,216,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PersonOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-primary)' }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                {entry.author}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                {formatDate(entry.created_at)}
                {isEdited && (
                  <Chip
                    label="수정됨"
                    size="small"
                    sx={{ ml: 1, height: 16, fontSize: '0.65rem', bgcolor: 'rgba(197,189,216,0.3)', color: 'var(--color-text-muted)' }}
                  />
                )}
              </Typography>
            </Box>
          </Box>

          {/* 수정/삭제 버튼 (뷰 모드에서만) */}
          {mode === 'view' && (
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <Tooltip title="수정">
                <IconButton
                  size="small"
                  onClick={handleEditClick}
                  sx={{ color: 'var(--color-text-muted)', '&:hover': { color: '#818264', bgcolor: 'rgba(129,130,100,0.08)' } }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="삭제">
                <IconButton
                  size="small"
                  onClick={handleDeleteClick}
                  sx={{ color: 'var(--color-text-muted)', '&:hover': { color: 'error.main', bgcolor: 'rgba(211,47,47,0.08)' } }}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* 본문: 뷰 모드 */}
        {mode === 'view' && (
          <Typography
            sx={{
              fontSize: '0.92rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pl: 5,
            }}
          >
            {entry.message}
          </Typography>
        )}

        {/* 본문: 수정 모드 */}
        {mode === 'edit' && (
          <Box sx={{ pl: 5 }}>
            <TextField
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              multiline
              minRows={3}
              maxRows={10}
              fullWidth
              size="small"
              inputProps={{ maxLength: 1000 }}
              helperText={`${editMessage.length} / 1000`}
              sx={{
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#76A7D8' },
                  '&.Mui-focused fieldset': { borderColor: '#76A7D8' },
                },
              }}
            />

            {saveError && (
              <Typography sx={{ fontSize: '0.8rem', color: 'error.main', mb: 1 }}>
                {saveError}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleCancel}
                disabled={saving}
                sx={{
                  borderColor: 'rgba(118,167,216,0.4)',
                  color: 'var(--color-text-secondary)',
                  '&:hover': { borderColor: 'var(--color-primary)' },
                }}
              >
                취소
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleSave}
                disabled={saving || !editMessage.trim()}
                startIcon={saving ? <CircularProgress size={12} color="inherit" /> : null}
                sx={{ bgcolor: '#818264', '&:hover': { bgcolor: '#4D4E30' } }}
              >
                {saving ? '저장 중...' : '저장'}
              </Button>
            </Box>
          </Box>
        )}
      </Card>

      <GuestbookPasswordDialog
        open={pwDialogOpen}
        mode={pwDialogMode}
        onClose={() => setPwDialogOpen(false)}
        onConfirm={handlePwConfirm}
      />
    </>
  );
}

export default GuestbookEntryCard;
