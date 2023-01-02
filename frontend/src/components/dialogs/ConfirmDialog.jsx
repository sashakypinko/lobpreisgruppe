import {
  Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import CustomButton from '@/components/inputs/buttons/CustomButton';

const styles = {
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  },
};

const ConfirmDialog = ({
  title,
  text,
  open,
  onClose,
  onConfirm,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="confirm-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => {
            onClose(true);
            onConfirm();
          }}
          intent="primary"
          className={classes.button}
        >
          {t('yes')}
        </CustomButton>
        <CustomButton
          onClick={() => onClose()}
          intent="primary"
          variant="outline"
          className={classes.button}
        >
          {t('no')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  title: '',
};
