import {
  styled,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from '@mui/material';

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    padding: '0.2rem',
    '@media (min-width:600px)': {
      padding: '0.25rem 1rem',
    },
  },
}));
