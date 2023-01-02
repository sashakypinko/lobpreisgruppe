import { Paper } from '@mui/material';
import { cx } from '@emotion/css';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  mobileBottom: {
    position: 'fixed',
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    borderRadius: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    zIndex: 10000,
    backgroundColor: 'transparent',
    color: '#dce5fc',
  },
  grey: {
    backgroundColor: 'grey',
  },
};

const MobileBottom = ({
  children,
  grey,
}) => {
  const classes = useClasses(styles);
  return (
    <Paper className={cx({
      [classes.mobileBottom]: true,
      [classes.grey]: grey,
    })}
    >
      {children}
    </Paper>
  );
};

export default MobileBottom;

MobileBottom.propTypes = {
  children: PropTypes.node.isRequired,
  grey: PropTypes.bool,
};
