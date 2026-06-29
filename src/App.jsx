import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FileSharePage from './pages/file-share-page';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <FileSharePage />
      </Container>
    </Box>
  );
}

export default App;
