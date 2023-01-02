import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';
import CloseIcon from '@/components/icons/CloseIcon';
import Songs from '@/screens/songs/Songs';

const styles = () => ({
  closeIcon: {
    position: 'absolute',
    right: 8,
    top: 16,
  },
  textField: {
    marginTop: '5px',
  },
  defaultCountry: {
    margin: '12px',
  },
});

const SongsModal = ({
  open,
  date,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog"
      fullWidth
      maxWidth="md"
      classes={{
        paper: classes.paperRoot,
      }}
    >
      <DialogTitle>
        <span>
          <Typography color="secondary" variant="h2">
            {t('supplierProfiles.editEndpoint')}
          </Typography>
        </span>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: '2px' }}>
        <Songs date={date} onSave={onAdd} inModal />
      </DialogContent>
    </Dialog>
  );
};

export default SongsModal;

SongsModal.propTypes = {
  open: PropTypes.bool,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
};
