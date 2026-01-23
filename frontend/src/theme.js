import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9D4EDD', // Violet
      light: '#C77DFF',
      dark: '#7B2CBF',
    },
    secondary: {
      main: '#06D6A0', // Teal
      light: '#26FFB8',
      dark: '#048A6D',
    },
    error: {
      main: '#EF476F', // Coral/Red for confrontation
    },
    warning: {
      main: '#FFB703', // Amber for realization
    },
    info: {
      main: '#4CC9F0', // Blue for clarity
    },
    background: {
      default: '#0E0E0E',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          padding: '12px 32px',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(157, 78, 221, 0.3)',
            },
          },
        },
      },
    },
  },
});

export default theme;
