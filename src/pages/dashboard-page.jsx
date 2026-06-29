import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Header from '../components/common/header';
import UploadDropzone from '../components/gallery/upload-dropzone';
import ImageGrid from '../components/gallery/image-grid';
import { useAnonymousAuth } from '../hooks/use-anonymous-auth';
import { useImages } from '../hooks/use-images';

/**
 * DashboardPage 컴포넌트
 *
 * 익명 인증, 업로드, 이미지 그리드를 조합한 대시보드 메인 화면.
 *
 * Example usage:
 * <DashboardPage />
 */
function DashboardPage() {
  const { user, loading: authLoading } = useAnonymousAuth();
  const { images, loading: imagesLoading, refetch } = useImages();

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography sx={{ color: 'error.main' }}>
          세션을 시작할 수 없습니다. Supabase 프로젝트의 Anonymous Sign-Ins 설정이
          켜져 있는지 확인해주세요.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <UploadDropzone userId={user.id} onUploaded={refetch} />
      <ImageGrid
        images={images}
        currentUserId={user.id}
        isLoading={imagesLoading}
        onDeleted={refetch}
      />
    </Box>
  );
}

export default DashboardPage;
