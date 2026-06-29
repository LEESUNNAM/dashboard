import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DashboardPage from './pages/dashboard-page';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <DashboardPage />
      </Container>
    </Box>
  );
}

export default App;
