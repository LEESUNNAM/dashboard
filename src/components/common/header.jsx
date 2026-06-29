import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Header 컴포넌트
 *
 * 대시보드 상단 타이틀과 설명을 표시한다.
 *
 * Example usage:
 * <Header />
 */
function Header() {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, lineHeight: 1.3 }}
      >
        이미지 갤러리 대시보드
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' }, mt: 1 }}>
        이미지를 업로드하고 누구나 갤러리를 보고 다운로드할 수 있습니다.
      </Typography>
    </Box>
  );
}

export default Header;
