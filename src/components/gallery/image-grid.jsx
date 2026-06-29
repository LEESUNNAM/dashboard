import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
        <CircularProgress />
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography sx={{ color: 'text.secondary' }}>
          아직 업로드된 이미지가 없습니다.
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
