import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';

/**
 * EmptyState 컴포넌트
 *
 * Props:
 * @param {string} category - 현재 선택된 카테고리 키 [Optional]
 * @param {string} search   - 현재 검색어 [Optional]
 * @param {function} onUploadClick - 업로드 유도 버튼 핸들러 [Optional]
 *
 * Example usage:
 * <EmptyState category="document" onUploadClick={fn} />
 */
function EmptyState({ category = 'all', search = '', onUploadClick }) {
  const hasFilter = category !== 'all' || search.trim();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
        gap: 2,
        textAlign: 'center',
      }}
    >
      <FolderOpenOutlinedIcon sx={{ fontSize: 64, color: 'var(--color-primary-light)', opacity: 0.7 }} />
      <Typography sx={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
        {hasFilter ? '조건에 맞는 파일이 없습니다.' : '아직 업로드된 파일이 없습니다.'}
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: 320 }}>
        {hasFilter
          ? '다른 카테고리를 선택하거나 검색어를 변경해보세요.'
          : '파일을 업로드하면 여기에 목록이 표시됩니다.'}
      </Typography>
      {!hasFilter && onUploadClick && (
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={onUploadClick}
          sx={{
            mt: 1,
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary-dark)',
            '&:hover': { bgcolor: 'rgba(118,167,216,0.08)' },
          }}
        >
          첫 파일 업로드하기
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
