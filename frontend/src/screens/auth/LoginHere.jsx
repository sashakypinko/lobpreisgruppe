import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const LoginHere = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center" alignContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography>{t('login.alreadyAccount')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomLink
          to={UrlEnums.LOGIN}
          button
          buttonProps={{
            fullWidth: true,
            variant: 'outlined',
          }}
        >
          {t('login')}
        </CustomLink>
      </Grid>
    </Grid>
  );
};

export default LoginHere;
