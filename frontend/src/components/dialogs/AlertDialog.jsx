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

const AlertDialog = ({
  title,
  text,
  open,
  onClose,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => {
            onClose();
          }}
          color="primary"
          className={classes.button}
        >
          {t('ok')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

AlertDialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
