import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import UploadingIcon from '@mui/icons-material/CloudUpload';

/**
 * UploadProgress 컴포넌트
 *
 * Props:
 * @param {Array} items - useUploadFiles 의 items 배열 [Required]
 *
 * Example usage:
 * <UploadProgress items={items} />
 */
function UploadProgress({ items }) {
  if (!items.length) return null;

  return (
    <Box sx={{ mb: 2 }}>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 1,
            px: 1.5,
            mb: 0.5,
            borderRadius: 1.5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor:
              item.status === 'done'
                ? 'rgba(76,175,80,0.3)'
                : item.status === 'error'
                ? 'rgba(211,47,47,0.3)'
                : 'rgba(118,167,216,0.25)',
          }}
        >
          {/* 상태 아이콘 */}
          {item.status === 'done' && (
            <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20, flexShrink: 0 }} />
          )}
          {item.status === 'error' && (
            <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 20, flexShrink: 0 }} />
          )}
          {(item.status === 'uploading' || item.status === 'pending') && (
            <UploadingIcon sx={{ color: 'var(--color-primary)', fontSize: 20, flexShrink: 0 }} />
          )}

          {/* 파일명 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: '0.82rem',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'var(--color-text-primary)',
              }}
            >
              {item.name}
            </Typography>
            {item.status === 'uploading' && (
              <LinearProgress
                variant="determinate"
                value={item.progress}
                sx={{ mt: 0.5, height: 3, borderRadius: 2, bgcolor: 'rgba(118,167,216,0.2)', '& .MuiLinearProgress-bar': { bgcolor: 'var(--color-primary)' } }}
              />
            )}
            {item.status === 'error' && (
              <Typography sx={{ fontSize: '0.75rem', color: 'error.main', mt: 0.2 }}>
                {item.error}
              </Typography>
            )}
          </Box>

          {/* 상태 뱃지 */}
          <Chip
            label={
              item.status === 'done' ? '완료' :
              item.status === 'error' ? '실패' :
              item.status === 'uploading' ? `${item.progress}%` : '대기'
            }
            size="small"
            sx={{
              fontSize: '0.7rem',
              height: 20,
              bgcolor:
                item.status === 'done' ? 'rgba(76,175,80,0.12)' :
                item.status === 'error' ? 'rgba(211,47,47,0.10)' :
                'rgba(118,167,216,0.15)',
              color:
                item.status === 'done' ? 'success.dark' :
                item.status === 'error' ? 'error.dark' :
                'var(--color-primary-dark)',
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default UploadProgress;
