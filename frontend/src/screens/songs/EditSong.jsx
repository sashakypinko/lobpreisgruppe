import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import {
  Add,
  RemoveCircleOutlined,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import useClasses from '@/components/layout/hooks/useClasses';
import CustomTextField from '@/components/inputs/CustomTextField';
import CustomCheckboxAutocomplete from '@/components/inputs/CustomCheckboxAutocomplete';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import useLoading from '@/components/loading/hooks/useLoading';
import useErrorCheck from '@/components/validations/hooks/useError';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import { SongLanguages } from '@/screens/songs/enums/SongEnums';
import CustomSelect from '@/components/inputs/CustomSelect';

const styles = {
  container: {
    margin: 0,
  },
  title: {
    marginBottom: '10px',
  },
  actionButton: {
    marginTop: '16px',
  },
  divider: {
    margin: '40px 0',
  },
  saveButton: {
    marginTop: '32px !important',
  },
};

const EditSong = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultValues = {
    name: '',
    tags: [],
    lang: '',
  };
  const [tags, setTags] = useState([]);
  const [songs, setSongs] = useState([{ ...defaultValues }]);
  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();
  const { createSuccessSnackbar, createErrorSnackbar } = useSnackbar();

  const [validations, validationValues] = useMemo(() => {
    const preparedValidations = {};
    const preparedValidationValues = {};
    songs.forEach((item, index) => {
      preparedValidations[`name_${index}`] = {
        type: 'isEmpty',
        text: 'songs.nameIsRequired',
      };
      preparedValidations[`lang_${index}`] = {
        type: 'isEmpty',
        text: 'songs.langIsRequired',
      };
      preparedValidationValues[`name_${index}`] = item.name;
      preparedValidationValues[`lang_${index}`] = item.lang;
    });
    return [preparedValidations, preparedValidationValues];
  }, [songs]);

  const {
    getActivateError,
    isError,
    deactivateError,
  } = useErrorCheck({
    values: validationValues,
    validations,
  });

  useEffect(() => {
    (async () => {
      const res = await Connections.postRequest(ApiEndpoints.getAllTags);

      if (res.ok) {
        setTags(res.data.tags.map(({ name }) => name));
      }
    })();
  }, []);

  const handleChange = ({
    name,
    value,
    index,
  }) => {
    const editableSong = { ...songs[index] };
    setSongs([
      ...songs.slice(0, index),
      {
        ...editableSong,
        [name]: value,
      },
      ...songs.slice(index + 1),
    ]);
  };

  const handleChangeTags = (values, index) => {
    values.forEach(value => {
      if (!tags.includes(value)) {
        setTags([...tags, value]);
      }
    });

    handleChange({
      name: 'tags',
      value: values,
      index,
    });
  };

  const handleRemoveRow = index => {
    setSongs([...songs.slice(0, index), ...songs.slice(index + 1)]);
  };

  const handleAddRow = () => {
    setSongs([...songs, { ...defaultValues }]);
  };

  const handleSave = async () => {
    setLoading(true);
    const err = getActivateError();

    if (!err) {
      const action = id === 'new' ? 'create' : 'update';
      const res = await Connections.postRequest(ApiEndpoints[`${action}Songs`], { songs });
      if (res.ok) {
        createSuccessSnackbar(t('supplierProfiles.cantSaveSupplierProfile'));
        navigate(UrlEnums.SONGS);
      } else {
        createErrorSnackbar(t('supplierProfiles.cantSaveSupplierProfile'));
      }
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Typography className={classes.title} variant="h1">
        {t('songs.editTitle')}
      </Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={2}>
        {
          songs.map(({
            name,
            tags: songTags,
            lang,
          }, index) => {
            return (
              <Grid
                container
                spacing={2}
                key={`song_row_${index}`}
                className={classes.container}
              >
                <Grid item xs={6} md={3}>
                  <CustomTextField
                    uiLibrary="mui"
                    label={t('name')}
                    value={name}
                    onChange={({ value }) => handleChange({
                      name: 'name',
                      value,
                      index,
                    })}
                    fullWidth
                    className={classes.textField}
                    error={isError(`name_${index}`)}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <CustomSelect
                    label={t('languages')}
                    value={lang}
                    options={SongLanguages.map(langOption => ({
                      text: langOption,
                      value: langOption,
                    }))}
                    onChange={({ value }) => handleChange({
                      name: 'lang',
                      value,
                      index,
                    })}
                    size="small"
                    error={isError(`lang_${index}`)}
                  />
                </Grid>
                <Grid item xs={9} md={4}>
                  <CustomCheckboxAutocomplete
                    options={tags.map(tagName => ({
                      key: tagName,
                      name: tagName,
                    }))}
                    value={songTags}
                    label={t('tags')}
                    openOnFocus
                    onChange={({ value }) => handleChangeTags(value, index)}
                    size="small"
                    freeSolo
                  />
                </Grid>
                <Grid item xs={3} md={1}>
                  <IconButton
                    aria-label="remove"
                    className={classes.actionButton}
                    disabled={songs.length < 2}
                    onClick={() => handleRemoveRow(index)}
                  >
                    <RemoveCircleOutlined fontSize="large" color={songs.length < 2 ? 'disabled' : 'error'}/>
                  </IconButton>
                </Grid>
              </Grid>
            );
          })
        }
        <Grid item xs={12}>
          <CustomButton
            variant="outline"
            size="small"
            onClick={handleAddRow}
          >
            <Add />
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            className={classes.saveButton}
            variant="outline"
            size="small"
            intent="primary"
            onClick={handleSave}
            fullMobile
          >
            {t('songs.save')}
          </CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

export default EditSong;

EditSong.propTypes = {};
