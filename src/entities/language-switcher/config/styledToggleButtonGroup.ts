import { styled, toggleButtonClasses, ToggleButtonGroup } from '@mui/material';

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    [`& .${toggleButtonClasses.root}`]: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      opacity: 0.7,
      margin: 0,
      padding: '2px 7px',

      [`&.${toggleButtonClasses.selected}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        opacity: 1,
      },
      '&:not(.Mui-selected):hover': {
        backgroundColor: theme.palette.secondary.main,
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  })
);
