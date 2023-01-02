import {
  FormHelperText, InputAdornment, TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'vcc-ui';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
// test
const styles = {
  success: {
    '& input:valid + fieldset': {
      borderColor: 'green',
    },
  },
};

const CustomTextField = (
  {
    uiLibrary = 'vcc',
    label,
    name,
    fieldName,
    value = '',
    onChange,
    error,
    valid,
    endText,
    ...rest
  },
) => {
  const { t } = useTranslation();

  const handleChange = e => {
    let { value: val } = e.target;

    if (rest.type === 'number' && val !== '') {
      val = Number(val);
      if (rest.max && val > rest.max) {
        return;
      }
    }

    onChange({
      name: name || fieldName,
      fieldName: fieldName || name,
      value: val,
    });
  };

  const classes = useClasses(styles);

  let onBlurFunction;
  if (rest.type === 'number') {
    onBlurFunction = () => value === '' && onChange({
      name: name || fieldName,
      fieldName: fieldName || name,
      value: 0,
    });
  }

  const labelText = t(label);

  return (
    uiLibrary === 'vcc' ? (
      <TextInput
        placeholder={labelText}
        onChange={handleChange}
        isValid={valid}
        value={value?.toString()}
        onBlur={onBlurFunction}
        label={labelText}
        errorMessage={error}
        {...rest}
      />
    )
      : (
        <>
          <TextField
            size="small"
            label={labelText}
            name={name}
            aria-label={t('textInput')}
            className={valid ? classes.success : ''}
            variant="outlined"
            fullWidth
            value={value}
            onChange={handleChange}
            onBlur={onBlurFunction}
            error={!!error}
            margin="normal"
            InputProps={{
              endAdornment: !!endText && <InputAdornment position="end">{endText}</InputAdornment>,
            }}
            {...rest}
          />
          {!!error && (
            <FormHelperText
              error={!!error}
            >
              {t(error)}
            </FormHelperText>
          )}
        </>
      )
  );
};

export default CustomTextField;

CustomTextField.propTypes = {
  ...TextField.propTypes,
  uiLibrary: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  fieldName: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  valid: PropTypes.bool,
  endText: PropTypes.string,
};
