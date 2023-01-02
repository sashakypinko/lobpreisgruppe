import {
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  title: {
    display: 'none',
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  logoLink: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '45px',
  },
});

export const HeaderText = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <CustomLink plain to="/">
      <Typography className={classes.title} variant="h6" noWrap color="inherit">
        {t('catalog')}
      </Typography>
    </CustomLink>
  );
};

const HeaderLogo = () => {
  const classes = useClasses(styles);
  return (
    <CustomLink className={classes.logoLink} plain to="/">
      <img
        className={classes.logo}
        src="/img/music.png"
        alt="music.png"
      />
    </CustomLink>
  );
};

export default HeaderLogo;
