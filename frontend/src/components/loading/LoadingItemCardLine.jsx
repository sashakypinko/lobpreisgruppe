import {
  Grid,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    boxSizing: 'border-box',
    zIndex: 1000,
    marginTop: 5,
    height: 227,
  },
  skeleton: {
    width: '100%',
    height: '100%',
  },
};

const LoadingItemCardLine = () => {
  const classes = useClasses(styles);
  return (
    <Grid
      item
      xs={12}
      className={classes.root}
    >
      <Skeleton
        className={classes.skeleton}
        variant="rectangular"
        animation="wave"
      />
    </Grid>
  );
};

export default LoadingItemCardLine;
