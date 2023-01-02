import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  successText: {
    color: 'var(--theme-palette-success-main)',
  },
};

const SuccessText = ({ text, center, ...rest }) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  if (!text) return null;

  return (
    <FormHelperText
      style={{
        textAlign: center ? 'center' : 'left',
      }}
      className={classes.successText}
      {...rest}
    >
      {t(text)}
    </FormHelperText>
  );
};

export default SuccessText;

SuccessText.propTypes = {
  text: PropTypes.string,
  center: PropTypes.bool,
};
