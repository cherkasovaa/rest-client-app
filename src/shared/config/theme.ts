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
  palette: {
    primary: {
      light: '#33513e',
      main: '#01260E',
      dark: '#001a09',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4de036',
      main: '#21D904',
      dark: '#179702',
      contrastText: '#011604',
    },
  },
  typography: sharedTypography,
});

export default theme;
