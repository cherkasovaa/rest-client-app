'use client';
import { createTheme } from '@mui/material/styles';

const sharedTypography = {
  fontFamily: 'Inter, Roboto, sans-serif',
  fontWeightLight: 400,
  h1: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontSize: '3rem',
    fontWeight: 700,
  },
  h2: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '2rem',
    fontFamily: 'Inter, Roboto, sans-serif',
    fontWeight: 400,
  },
  h4: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontSize: '1.7rem',
  },
  h5: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  h6: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  button: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontWeight: 700,
  },
  subtitle1: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontWeight: 400,
  },
  caption1: {
    fontFamily: 'Inter, Roboto, sans-serif',
    fontWeight: 400,
  },
  overline: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
};

const theme = createTheme({
  components: {
    // TODO: remove. By default color is secondary contrast
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-focused': {
            color: '#fff',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          color: '#fff',
          '::placeholder': '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0D1830',
      contrastText: '#EBF1FF',
    },
    secondary: {
      main: '#3EF6F3',
      contrastText: '#0D1830',
    },
  },
  typography: sharedTypography,
});

export default theme;
