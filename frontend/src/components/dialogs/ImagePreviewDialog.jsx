import { forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grow,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import CloseIcon from '@/components/icons/CloseIcon';

const styles = theme => ({
  paperRoot: {
    height: '100%',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 8,
    top: 16,
  },
  imagesWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: theme.spacing(1.5),
  },
  image: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    border: '1px solid lightgray',
    width: '100%',
  },
});

// noinspection RequiredAttributes
const Transition = forwardRef((props, ref) => <Grow ref={ref} {...props} />);

const ImagePreviewDialog = ({
  imageUrls,
  onClose,
  dialogContentProps,
  ...rest
}) => {
  const urlList = (() => {
    if (!imageUrls) return [];
    return typeof imageUrls === 'string' ? [imageUrls] : imageUrls;
  })();

  const classes = useClasses(styles);

  return (
    <Dialog
      open={urlList.length > 0}
      onClose={onClose}
      aria-labelledby="alert-dialog"
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      classes={{
        paper: classes.paperRoot,
      }}
      {...rest}
    >
      <DialogTitle>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent {...dialogContentProps}>
        <div className={classes.imagesWrapper}>
          { urlList.map((url, i) => (
            <img key={`image_${i}`} alt="" src={url} className={classes.image} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;

ImagePreviewDialog.propTypes = {
  imageUrls: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onClose: PropTypes.func,
  dialogContentProps: PropTypes.object,
};
