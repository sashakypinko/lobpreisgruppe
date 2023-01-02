import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

import Loading from './Loading';

const styles = {
  loadingText: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    fontWeight: 'bold',
    zIndex: '1000',
    color: 'rgba(0,0,0,0.4)',
  },
  textDiv: { marginTop: 5, height: '100%' },
};

const LoadingTable = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <div className={classes.textDiv}>
      <Loading />
      <div className={classes.loadingText}>
        <Typography variant="subtitle1" className="animated infinite jello slow">
          {t('loading')}
        </Typography>
      </div>
      <Skeleton animation="wave" variant="rectangular" height="100%" />
    </div>
  );
};

export default LoadingTable;
