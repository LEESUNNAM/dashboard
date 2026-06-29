import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ImageCard from './image-card';

/**
 * ImageGrid 컴포넌트
 *
 * Props:
 * @param {Array} images - 표시할 이미지 메타데이터 목록 [Required]
 * @param {string} currentUserId - 현재 로그인된 사용자 id [Required]
 * @param {boolean} isLoading - 목록 로딩 여부 [Optional, 기본값: false]
 * @param {function} onDeleted - 이미지 삭제 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <ImageGrid images={images} currentUserId={user.id} onDeleted={refetch} />
 */
function ImageGrid({ images, currentUserId, isLoading = false, onDeleted }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress sx={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <CollectionsOutlinedIcon
          sx={{ fontSize: 52, color: 'var(--color-primary-light)', opacity: 0.7 }}
        />
        <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          아직 업로드된 이미지가 없습니다.
        </Typography>
        <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          위 버튼을 눌러 첫 번째 이미지를 추가해보세요.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {images.map((image) => (
        <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ImageCard image={image} currentUserId={currentUserId} onDeleted={onDeleted} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageGrid;
