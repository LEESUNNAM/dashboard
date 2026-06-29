import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileCard from './file-card';
import EmptyState from '../common/empty-state';

/**
 * FileList 컴포넌트
 *
 * Props:
 * @param {Array}    files        - 표시할 파일 목록 [Required]
 * @param {boolean}  isLoading    - 로딩 여부 [Required]
 * @param {string}   error        - 에러 메시지 [Optional]
 * @param {string}   category     - 현재 카테고리 (EmptyState 전달용) [Optional]
 * @param {string}   search       - 현재 검색어 (EmptyState 전달용) [Optional]
 * @param {function} onUploadClick - Empty State 업로드 버튼 핸들러 [Optional]
 * @param {function} onDeleted    - 파일 삭제 후 목록 갱신 콜백 [Required]
 *
 * Example usage:
 * <FileList files={files} isLoading={loading} onDeleted={refetch} />
 */
function FileList({ files, isLoading, error, category, search, onUploadClick, onDeleted }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography sx={{ color: 'error.main', fontSize: '0.9rem' }}>
          파일 목록을 불러오는 데 실패했습니다: {error}
        </Typography>
      </Box>
    );
  }

  if (files.length === 0) {
    return (
      <EmptyState category={category} search={search} onUploadClick={onUploadClick} />
    );
  }

  return (
    <Grid container spacing={{ xs: 1.5, md: 2 }}>
      {files.map((file) => (
        <Grid key={file.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FileCard file={file} onDeleted={onDeleted} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FileList;
