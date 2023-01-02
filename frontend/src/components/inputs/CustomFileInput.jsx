import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = () => ({
  inputWrapper: {
    display: 'flex',
  },
  fileName: {
    padding: '6px',
  },
});

const FileInput = ({
  label,
  value,
  variant = 'contained',
  size = 'medium',
  disabled,
  onChange,
}) => {
  const classes = useClasses(styles);

  const handleChange = e => {
    const files = Array.from(e.target.files);
    const [file] = files;
    onChange(file);
  };

  return (
    <Box className={classes.inputWrapper}>
      <Button
        variant={variant}
        size={size}
        component="label"
        disabled={disabled}
      >
        {label}
        <input
          hidden
          multiple
          type="file"
          onChange={handleChange}
        />
      </Button>
      <Typography className={classes.fileName}>
        {value?.name}
      </Typography>
    </Box>
  );
};

export default FileInput;

FileInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
