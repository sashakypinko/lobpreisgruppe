import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

import { version } from '../../../../package.json';

const styles = theme => ({
  container: {
    textAlign: 'center',
    marginBottom: 25,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 85,
    },
  },
});

const Footer = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  return (
    <Container className={classes.container}>
      <Box mt={8}>
        <Typography variant="body1" color="textSecondary" align="center">
          <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: t('app.providedBy') }} />
          {t('app.copyright')}{' '}{new Date().getFullYear()}
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          <small>{`Version: ${version}`}</small>
        </Typography>
      </Box>
    </Container>
  );
};
export default Footer;
