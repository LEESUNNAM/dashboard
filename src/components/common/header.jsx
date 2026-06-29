import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';

/**
 * Header 컴포넌트
 *
 * Props:
 * @param {function} onUploadClick - 업로드 영역으로 스크롤 이동 [Required]
 * @param {object}   user          - Supabase 인증 유저 객체 [Required]
 * @param {function} onSignOut     - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <Header onUploadClick={scrollToUpload} user={user} onSignOut={signOut} />
 */
function Header({ onUploadClick, user, onSignOut }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #76A7D8 0%, #9FC1E4 45%, #C5BDD8 100%)',
        borderRadius: 3,
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 5 },
        mb: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      {/* 배경 장식 */}
      <Box aria-hidden="true" sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', bottom: -40, left: '40%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

      {/* 브랜드 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
        <Box
          sx={{
            width: { xs: 48, md: 60 },
            height: { xs: 48, md: 60 },
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 4px rgba(255,255,255,0.2)',
            flexShrink: 0,
          }}
        >
          <FolderZipOutlinedIcon sx={{ fontSize: { xs: 26, md: 32 }, color: 'white' }} />
        </Box>
        <Box>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: 'white', lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
          >
            File Share Hub
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.95rem' }, color: 'rgba(255,255,255,0.88)', mt: 0.4, lineHeight: 1.5 }}>
            필요한 파일을 업로드하고 다른 사용자와 공유할 수 있는 파일 자료실입니다.
          </Typography>
        </Box>
      </Box>

      {/* 우측 액션 영역 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          gap: 1,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* 로그인 유저 이메일 */}
        {user?.email && (
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.email}
          </Typography>
        )}

        {/* 버튼 영역 */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* 로그아웃 */}
          <Tooltip title="로그아웃">
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={onSignOut}
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                color: 'white',
                fontWeight: 500,
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              로그아웃
            </Button>
          </Tooltip>

          {/* 파일 업로드 */}
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={onUploadClick}
            sx={{
              bgcolor: '#818264',
              color: 'white',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              '&:hover': { bgcolor: '#4D4E30' },
            }}
          >
            파일 업로드
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
