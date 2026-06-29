import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';

/**
 * Header 컴포넌트
 *
 * D'etre 컬러 팔레트 기반 히어로 섹션.
 * DASHLEE 캡슐 디자인 시스템의 줌인 애니메이션을 장식 요소로 재현한다.
 *
 * Example usage:
 * <Header />
 */
function Header() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #76A7D8 0%, #9FC1E4 40%, #C5BDD8 100%)',
        borderRadius: 3,
        p: { xs: 4, md: 6 },
        mb: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 3, md: 5 },
      }}
    >
      {/* 배경 장식 원 */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: '-60px',
          left: '30%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* DASHLEE 캡슐 프레임 — 세로형 타원, 줌인 루프 */}
      <Box
        aria-hidden="true"
        className="capsule-animate"
        sx={{
          flexShrink: 0,
          width: { xs: 100, md: 130 },
          height: { xs: 135, md: 175 },
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 35% 30%, #FFFFFF55 0%, #9FC1E4 30%, #537597 70%, #2D4866 100%)',
          boxShadow: [
            '0 0 0 6px rgba(255,255,255,0.35)',
            '0 0 0 10px rgba(83,117,151,0.30)',
            '0 0 0 13px rgba(197,189,216,0.20)',
            '0 12px 32px rgba(45,72,102,0.35)',
          ].join(', '),
          animation: 'capsule-zoom 2.23s linear infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 캡슐 내부 빛 반짝임 */}
        <Box
          sx={{
            position: 'absolute',
            top: '18%',
            left: '22%',
            width: '28%',
            height: '22%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            filter: 'blur(6px)',
            animation: 'capsule-glint 2.23s ease-in-out infinite',
          }}
        />
        <CollectionsIcon
          sx={{
            fontSize: { xs: 36, md: 48 },
            color: 'rgba(255,255,255,0.90)',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </Box>

      {/* 텍스트 */}
      <Box sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.4rem' },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 1,
            textShadow: '0 1px 4px rgba(0,0,0,0.18)',
            letterSpacing: '-0.02em',
          }}
        >
          이미지 갤러리 대시보드
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            opacity: 0.88,
            lineHeight: 1.65,
            maxWidth: 420,
            textShadow: '0 1px 2px rgba(0,0,0,0.12)',
          }}
        >
          이미지를 업로드하고 누구나 갤러리를 보고 다운로드할 수 있습니다.
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
