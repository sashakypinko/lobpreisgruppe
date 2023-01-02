import { Button } from 'vcc-ui';
import { Button as MuiButton } from '@mui/material';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  fullMobile: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  fullWidth: {
    width: '100%',
  },
});

const CustomButton = forwardRef(({
  children,
  text,
  buttonTheme,
  fullMobile,
  fullWidth,
  endIcon,
  color = 'primary',
  uiLibrary = 'vcc',
  ...rest
}, ref) => {
  const classes = useClasses(styles);
  const buttonProps = { ...rest, color };

  let { className: buttonClassName = '' } = buttonProps;

  if (buttonTheme === 'primary') buttonProps.color = 'primary';

  if (fullMobile) buttonClassName += ` ${classes.fullMobile}`;

  if (uiLibrary !== 'vcc') {
    return (
      <MuiButton
        ref={ref}
        aria-label={text || 'button'}
        size={buttonProps.size ? buttonProps.size : 'medium'}
        {...buttonProps}
        className={`${buttonClassName} ${fullWidth ? classes.fullWidth : ''}`}
      >
        {children}{endIcon || ''}
      </MuiButton>
    );
  }

  return (
    <Button
      ref={ref}
      aria-label={text || 'button'}
      size={buttonProps.size ? buttonProps.size : 'medium'}
      {...buttonProps}
      className={`${buttonClassName} ${fullWidth ? classes.fullWidth : ''}`}
    >
      {children}{endIcon || ''}
    </Button>
  );
});

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  buttonTheme: PropTypes.string,
  fullMobile: PropTypes.bool,
  fullWidth: PropTypes.bool,
  endIcon: PropTypes.node,
  color: PropTypes.string,
  uiLibrary: PropTypes.string,
};
