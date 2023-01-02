import { useTranslation } from 'react-i18next';
import { AddCircle } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import UrlHelper from '@/components/connections/UrlHelper';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import CustomLink from '@/components/inputs/CustomLink';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import useLoading from '@/components/loading/hooks/useLoading';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import { useEffect, useState } from 'react';
import PraisesList from '@/screens/praises/PraisesList';

const styles = {
  title: {
    marginBottom: '10px',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: '50px',
  },
};

const Praises = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const [praises, setPraises] = useState([]);
  const {
    createSuccessSnackbar,
    createErrorSnackbar,
  } = useSnackbar();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();

  const getPraises = async () => {
    setLoading(true);

    const res = await Connections.postRequest(ApiEndpoints.getPraises);

    if (res.ok) {
      setPraises(res.data.praises);
      createSuccessSnackbar(t('praises.gettingPraisesSuccess'));
    } else {
      createErrorSnackbar(t('praises.gettingPraisesFailed'));
    }

    setLoading(false);
  };

  useEffect(() => {
    getPraises()
      .then();
  }, []);

  const handlePraiseEdit = async newPraise => {
    setLoading(true);

    const res = await Connections.postRequest(ApiEndpoints.updatePraise, {
      praise: {
        songs: newPraise.songs,
        date: newPraise.date,
      },
    });

    if (res.ok) {
      await getPraises();
      createSuccessSnackbar(t('praises.updatingPraiseSuccess'));
    } else {
      createErrorSnackbar(t('praises.updatingPraiseFailed'));
    }

    setLoading(false);
  };

  const handlePraiseDelete = async _id => {
    setLoading(true);

    const res = await Connections.postRequest(ApiEndpoints.removePraise, { _id });

    if (res.ok) {
      await getPraises();
      createSuccessSnackbar(t('praises.deletingPraiseSuccess'));
    } else {
      createErrorSnackbar(t('praises.deletingPraiseFailed'));
    }

    setLoading(false);
  };

  const handlePraiseConfirm = async _id => {
    setLoading(true);

    const res = await Connections.postRequest(ApiEndpoints.confirmPraise, { _id });

    if (res.ok) {
      await getPraises();
      createSuccessSnackbar(t('praises.confirmationPraiseSuccess'));
    } else {
      createErrorSnackbar(t('praises.confirmationPraiseFailed'));
    }

    setLoading(false);
  };

  if (loading) return <Loading/>;

  return (
    <>
      <div className={classes.spaceBetween}>
        <Typography className={classes.title} variant="h1">
          {t('praises.title')}
        </Typography>
        <CustomLink
          to={UrlHelper.replaceParamsInReactUrl(UrlEnums.SONGS, { id: 'new' })}
          plain
        >
          <CustomButton
            uiLibrary="mui"
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
          >
            <AddCircle sx={{ mr: 1 }}/> {t('praises.addNew')}
          </CustomButton>
        </CustomLink>
      </div>
      <Grid className={classes.container} container spacing={2}>
        <PraisesList
          praises={praises}
          loading={loading}
          Loading={Loading}
          onEdit={handlePraiseEdit}
          onDelete={handlePraiseDelete}
          onConfirm={handlePraiseConfirm}
        />
      </Grid>
    </>
  );
};

export default Praises;

Praises.propTypes = {};
