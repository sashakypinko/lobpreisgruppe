import { LinearProgress, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Loading = ({ type, ...rest }) => {
  const classes = useClasses(styles);

  return (
    <span className={classes.root}>
      {type === 'circular'
        ? <CircularProgress {...rest} />
        : <LinearProgress {...rest} />}
    </span>
  );
};

Loading.defaultProps = {
  size: 'default',
};

export default Loading;

Loading.propTypes = {
  type: PropTypes.oneOf(['circular', 'linear']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
};
