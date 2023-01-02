import { CircularProgress } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -40,
  },
};

const LoadingCover = () => {
  const classes = useClasses(styles);
  return (
    <div className={classes.loading}>
      <CircularProgress
        className={classes.circle}
        color="secondary"
        thickness={4}
      />
    </div>
  );
};

export default LoadingCover;
