import {
  FormControlLabel,
  FormHelperText,
  Radio,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CustomRadio = (
  {
    label,
    name,
    onChange,
    error,
    valid,
    endText,
    checked,
    ...rest
  },
) => {
  const { t } = useTranslation();

  const handleChangeRadio = e => {
    const { value } = e.target;
    onChange({ name, value });
  };

  return (
    <>
      <FormControlLabel
        control={(
          <Radio
            checked={checked}
            onChange={handleChangeRadio}
            name={name}
            inputProps={{
              'aria-label': label,
            }}
            {...rest}
          />
        )}
        label={t(label)}
      />
      {!!error && (
      <FormHelperText
        error={!!error}
      >
        {t(error)}
      </FormHelperText>
      )}
    </>
  );
};

export default CustomRadio;

CustomRadio.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  valid: PropTypes.bool,
  endText: PropTypes.string,
  checked: PropTypes.bool,
};
