import { createTheme } from '@mui/material/styles';

import ThemeColors, { CustomGroupColors } from '@/components/layout/theme/ThemeColors';

import variants from './variants';
import typography from './typography';
import components from './components';

const theme = variant => createTheme({
  components: components,
  typography,
  palette: variant.palette,
  colors: {
    themeColors: ThemeColors,
    customColors: CustomGroupColors,
  },
  zIndex: {
    modal: 10100,
    snackbar: 10200,
    tooltip: 10300,
  },
});

const themes = variants.map(variant => theme(variant));

export default themes;
