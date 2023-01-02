import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ErrorText = ({ error, center, ...rest }) => {
  const { t } = useTranslation();

  if (!error) return null;

  return (
    <FormHelperText
      error
      style={{
        textAlign: center ? 'center' : 'left',
      }}
      {...rest}
    >
      {Array.isArray(error) ? error.map(e => <>{e}<br /></>) : t(error)}
    </FormHelperText>
  );
};

export default ErrorText;

ErrorText.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  center: PropTypes.bool,
};
