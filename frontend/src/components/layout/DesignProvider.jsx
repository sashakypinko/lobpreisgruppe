import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider, Global, css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { StyleProvider, ThemePicker } from 'vcc-ui';
import PropTypes from 'prop-types';

import SuccessSnackBar from '@/components/dialogs/snackbars/SuccessSnackBar';
import ErrorSnackBar from '@/components/dialogs/snackbars/ErrorSnackBar';
import ThemeColors from '@/components/layout/theme/ThemeColors';

import muiTheme from './theme';
import BasicLayout from './BasicLayout';

const GlobalStyles = () => {
  const theme = useTheme();

  const styles = useMemo(() => css({
    ':root': {
      '--color-accentPink': ThemeColors.accentPink,
      '--theme-breakpoints-values-sm': `${theme.breakpoints.values.sm}px`,
      '--theme-spacing-1': theme.spacing(1),
      '--theme-spacing-2': theme.spacing(2),
      '--theme-spacing-4': theme.spacing(4),
      '--theme-spacing-5': theme.spacing(5),
      '--theme-spacing-3_0_2': theme.spacing(3, 0, 2),
      '--theme-spacing-0_1': theme.spacing(0, 1),
      '--theme-spacing-8': theme.spacing(8),
      '--theme-palette-primary-main': theme.palette.primary.main,
      '--theme-palette-success-main': theme.palette.success.main,
      '--theme-palette-warning-main': theme.palette.warning.main,
      '--theme-palette-secondary-main': theme.palette.secondary.main,
      '--theme-palette-success-contrastText': theme.palette.success.contrastText,
      '--theme-palette-primary-contrastText': theme.palette.primary.contrastText,
      '--theme-palette-error-contrastText': theme.palette.error.contrastText,
      '--theme-palette-error-main': theme.palette.error.main,
    },
  }), [theme]);

  return <Global styles={styles} />;
};

const DesignProvider = ({ currentTheme = 0, children }) => {
  const myTheme = muiTheme[currentTheme];

  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <StylesProvider injectFirst>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={myTheme}>
              <ThemeProvider theme={myTheme}>
                <GlobalStyles />
                <BasicLayout>
                  {children}
                </BasicLayout>
                <SuccessSnackBar />
                <ErrorSnackBar />
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </StylesProvider>
      </ThemePicker>
    </StyleProvider>
  );
};

export default DesignProvider;

DesignProvider.propTypes = {
  currentTheme: PropTypes.number,
  children: PropTypes.node.isRequired,
};
