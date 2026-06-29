import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#76A7D8',
      light: '#9FC1E4',
      dark: '#537597',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#C5BDD8',
      contrastText: '#47453C',
    },
    background: {
      default: '#F4F8FC',
      paper: '#F9F8FB',
    },
    text: {
      primary: '#47453C',
      secondary: '#42484C',
      disabled: '#AAADAE',
    },
    divider: 'rgba(118,167,216,0.25)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#818264',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4D4E30',
          },
          '&:disabled': {
            backgroundColor: '#AAADAE',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F9F8FB',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(83,117,151,0.10)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#537597',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#76A7D8',
        },
      },
    },
  },
});

export default theme;
