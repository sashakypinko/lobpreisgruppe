import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  successText: {
    color: 'var(--theme-palette-warning-main)',
  },
};

const WarningText = ({
  text, translationParams, center, ...rest
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  if (!text) return null;

  return (
    <FormHelperText
      component="span"
      style={{
        textAlign: center ? 'center' : 'left',
      }}
      className={classes.successText}
      {...rest}
    >
      {t(text, translationParams)}
    </FormHelperText>
  );
};

export default WarningText;

WarningText.propTypes = {
  text: PropTypes.string,
  translationParams: PropTypes.object,
  center: PropTypes.bool,
};
