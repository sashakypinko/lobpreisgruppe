import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const styles = {
  image: {
    width: '100%',
  },
  subtitle: {
    fontSize: '150%',
    fontWeight: 'bold',
  },
  caption: {
    textTransform: 'uppercase',
    fontSize: '70%',
    fontWeight: 'bold',
  },
  notAllowed: {
    cursor: 'not-allowed',
    filter: 'grayscale(1)',
  },
  container: {
    marginTop: '2em',
  },
  bannerLogos: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Home = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(UrlEnums.SONGS);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title')} | {t('home')}</title>
        <meta name="description" content={`${t('app.description')} | ${t('home')}`}/>
      </Helmet>
      <Grid className={classes.container} container spacing={2}>
        <Grid container spacing={2}>
          Home
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
