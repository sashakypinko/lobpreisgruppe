import { Grow, Alert } from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  alert: {
    fontSize: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    marginBottom: 40,
    flexDirection: 'column',
  },
  alertIcon: {
    fontSize: 50,
  },
};

const Success = ({ children }) => {
  const classes = useClasses(styles);
  return (
    <Grow in timeout={700}>
      <Alert
        className={classes.alert}
        severity="success"
        classes={{
          icon: classes.alertIcon,
        }}
      >
        {children}
      </Alert>
    </Grow>
  );
};

export default Success;

Success.propTypes = {
  children: PropTypes.node.isRequired,
};
