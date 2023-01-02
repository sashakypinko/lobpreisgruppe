import { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { Typography, IconButton, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import CustomButton from '@/components/inputs/buttons/CustomButton';
import CustomTextField from '@/components/inputs/CustomTextField';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  colorInput: {
    marginRight: 10,
  },
  colorPicker: {
    zIndex: 10000,
  },
  wrapper: {
    width: '100%',
  },
  opacityText: {
    color: '#BBB',
    fontWeight: 400,
    padding: 2,
    fontSize: '85%',
  },
};

let timeout = null;

const getOpacity = rgba => {
  if (!rgba) return 100;
  return (Number(rgba.replace(/^.*,(.+)\)/, '$1')) || 1) * 100;
};

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

function rgbToHex(color) {
  if (!color) return color;
  // eslint-disable-next-line no-bitwise
  if (~color.indexOf('#')) return color;
  const newColor = color.replace(/[^\d,]/g, '').split(',');
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (+newColor[0] << 16) + (+newColor[1] << 8) + +newColor[2]).toString(16).slice(1)}`;
}

const PaletteCardItem = ({
  onChange, name, rootClassName, value, label, ...rest
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  const [localColor, setLocalColor] = useState(rgbToHex(value));
  const [opacity, setOpacity] = useState(getOpacity(value));
  const [viewOpacity, setViewOpacity] = useState(false);

  useEffect(() => {
    if (rgbToHex(value) !== localColor) {
      setLocalColor(rgbToHex(value));
      setOpacity(getOpacity(value));
    } else if (getOpacity(value) !== opacity) {
      setOpacity(getOpacity(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => () => {
    if (timeout) clearTimeout(timeout);
  }, []);

  const setupChange = colorOptions => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let {
        color: newColor = localColor,
      } = colorOptions;

      const {
        opacity: newOpacity = opacity,
      } = colorOptions;

      if (newOpacity !== 100) {
        const rgbColor = hexToRgb(localColor);
        if (rgbColor) {
          newColor = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${newOpacity / 100})`;
        }
      }

      if (onChange) {
        onChange({
          name,
          value: newColor,
        });
      }

      if (newOpacity !== opacity) {
        setOpacity(newOpacity);
      }
    }, 500);
  };

  const handleChange = e => {
    const color = e.target.value;
    setLocalColor(color);
    setupChange({ color });
  };

  const changeColorDirectly = ({ value: color }) => {
    onChange({
      name,
      value: color,
    });
  };

  const handleSliderChange = (event, newValue) => {
    setOpacity(newValue);
    setupChange({ opacity: newValue });
  };

  const handleOpacityChange = ({ value: newOpacity }) => {
    if (newOpacity && newOpacity > 100) return;
    setOpacity(newOpacity);
    newOpacity !== '' && setupChange({ opacity: newOpacity });
  };

  const {
    disabled, disabledPalette, secondaryAction = null, ...restListItem
  } = rest;

  const isPaletteDisabled = disabled || disabledPalette;

  return (
    <ListItem
      className={rootClassName}
      disabled={disabled}
      {...restListItem}
    >
      <Box sx={{ width: '100%' }}>
        {typeof label === 'string'
          ? (
            <Typography
              color={isPaletteDisabled ? 'textSecondary' : 'primary'}
              sx={{ fontSize: '90%' }}
            >{t(label)}
            </Typography>
          )
          : label}
        <Box sx={{ display: 'flex', width: '100%' }}>
          <input
            type="color"
            value={localColor}
            onChange={handleChange}
            className={classes.colorInput}
            disabled={isPaletteDisabled}
            style={{
              opacity: isPaletteDisabled ? 0.5 : 1,
              width: 35,
              height: 25,
            }}
          />
          <CustomTextField
            value={value}
            onChange={changeColorDirectly}
            disabled={isPaletteDisabled}
            sx={{ mt: 0 }}
            InputProps={{ inputProps: { style: { padding: '2px 6px 2px 6px', fontSize: '90%' } } }}
            uiLibrary="mui"
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          {viewOpacity && (
            <IconButton
              onClick={() => setViewOpacity(false)}
              disabled={isPaletteDisabled}
              size="small"
            >
              <Check fontSize="small" />
            </IconButton>
          )}
          {!viewOpacity && (
            <CustomButton
              onClick={() => setViewOpacity(true)}
              variant="text"
              className={classes.opacityText}
              disabled={isPaletteDisabled}
            >
              Opacity {opacity}%
            </CustomButton>
          )}
          {viewOpacity && (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography sx={{ fontSize: '90%' }}>
                  Opacity
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Slider
                  value={opacity}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  disabled={isPaletteDisabled}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  className={classes.input}
                  value={opacity}
                  margin="dense"
                  onChange={handleOpacityChange}
                  disabled={isPaletteDisabled}
                  fullWidth={false}
                  variant="standard"
                  type="number"
                  InputProps={{
                    endAdornment: <Box sx={{ fontSize: '80%' }}>%</Box>,
                    inputProps: {
                      step: 10,
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                      style: {
                        fontSize: '80%',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
        {secondaryAction}
      </Box>
    </ListItem>
  );
};

PaletteCardItem.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  rootClassName: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default PaletteCardItem;
