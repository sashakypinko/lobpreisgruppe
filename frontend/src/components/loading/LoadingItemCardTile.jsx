import {
  Grid,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    boxSizing: 'border-box',
    zIndex: 500,
    height: 408,
  },
  skeleton: {
    width: '100%',
    height: '100%',
  },
};

const LoadingItemCardTile = () => {
  const classes = useClasses(styles);
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
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

export default LoadingItemCardTile;
