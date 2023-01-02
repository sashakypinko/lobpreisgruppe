import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  formControl: {
    minWidth: 50,
    verticalAlign: 'middle',
    marginTop: 16,
  },
  nativeInput: {
    boxSizing: 'border-box',
  },
  icon: { marginRight: 10 },
};

const CustomSelect = ({
  label,
  value,
  onChange,
  error,
  name,
  formControlProps,
  fullWidth,
  options,
  required = false,
  ...rest
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  const handleChange = e => {
    const { value: val } = e.target;
    onChange({ name, value: val });
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      className={classes.formControl}
      error={!!error}
      size="small"
      {...formControlProps}
    >
      {label && <InputLabel>{t(label)} {required && '*'}</InputLabel>}
      <Select
        value={value}
        onChange={handleChange}
        classes={{
          nativeInput: classes.nativeInput,
        }}
        label={label ? t(label) : label}
        {...rest}
      >
        {
          options.map(
            ({
              key, value: optionValue, text, icon: Icon, ...optionProps
            }) => (
              <MenuItem key={key || optionValue} value={optionValue} {...optionProps}>
                {Icon && <Icon className={classes.icon} />}{t(text)}
              </MenuItem>
            ),
          )
        }
      </Select>
      {!!error && <FormHelperText>{t(error)}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;

CustomSelect.defaultProps = {
  fullWidth: true,
  options: [],
  formControlProps: {},
};

CustomSelect.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  formControlProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  options: PropTypes.array,
  required: PropTypes.bool,
};
