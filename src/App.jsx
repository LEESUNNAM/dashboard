import { useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useAuth } from './hooks/use-auth';
import LoginPage from './pages/login-page';
import FileSharePage from './pages/file-share-page';
import GuestbookPage from './pages/guestbook-page';

function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [page, setPage] = useState('files');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress sx={{ color: '#76A7D8' }} />
      </Box>
    );
  }

  if (!user) {
    return <LoginPage onSignIn={signIn} onSignUp={signUp} />;
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 상단 네비게이션 탭 */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(118,167,216,0.22)',
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 1px 6px rgba(83,117,151,0.08)',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          <Tabs
            value={page}
            onChange={(_, v) => setPage(v)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.92rem',
                minHeight: 48,
                color: 'var(--color-text-muted)',
              },
              '& .Mui-selected': { color: '#537597' },
              '& .MuiTabs-indicator': { bgcolor: '#76A7D8', height: 3 },
            }}
          >
            <Tab
              value="files"
              label="파일 자료실"
              icon={<FolderZipOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
            />
            <Tab
              value="guestbook"
              label="방명록"
              icon={<ForumOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
            />
          </Tabs>
        </Container>
      </Box>

      {/* 페이지 콘텐츠 */}
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          {page === 'files'     && <FileSharePage user={user} onSignOut={signOut} />}
          {page === 'guestbook' && <GuestbookPage user={user} onSignOut={signOut} />}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
