import ThemeColors, { CustomGroupColors } from '@/components/layout/theme/ThemeColors';

const components = {
  MuiToolbar: {
    regular: {
      '@media (min-width: 600px)': {
        minHeight: '70px',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
  drawerPaper: {
    styleOverrides: {
      backgroundColor: 'rgb(17,70,128)',
      color: '#f8f8f8',
    },
  },
  MuiSkeleton: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: 5,
    },
    text: {
      transform: 'scale(1, 0.9)',
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: '24px',
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.2em',
        paddingBottom: '1.2em',
        textDecoration: 'underline',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        marginTop: '-4px',
        marginRight: '-4px',
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        outline: 0,
        color: ThemeColors.primaryText,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        outline: 'none',
        height: '36px',
        borderRadius: 4,
        padding: '12px',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 8,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        height: '36px',
        outline: 'none',
        borderRadius: 4,
        padding: '12px',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        color: ThemeColors.secondaryText,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        color: ThemeColors.primaryText,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: ThemeColors.secondaryText,
        '&$disabled': {
          color: CustomGroupColors.greyTwo,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        color: ThemeColors.primaryText,
        '&$disabled': {
          color: CustomGroupColors.greyTwo,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: '#141414',
      },
      colorTextPrimary: {
        color: '#141414',
      },
      colorTextSecondary: {
        color: ThemeColors.secondaryText,
      },
    },
  },
  MuiPickersToolbar: {
    styleOverrides: {
      toolbar: {
        '& h4': {
          fontSize: '2.125rem',
          fontWeight: 400,
        },
      },
    },
  },
};

export default components;
