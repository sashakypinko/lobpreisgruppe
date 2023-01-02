import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, Grid, IconButton } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import CustomTextField from '@/components/inputs/CustomTextField';
import CustomCheckboxAutocomplete from '@/components/inputs/CustomCheckboxAutocomplete';
import { SongLanguages } from '@/screens/songs/enums/SongEnums';
import CustomSelect from '@/components/inputs/CustomSelect';
import { CheckRounded, ClearRounded, DeleteForeverRounded, EditRounded } from '@mui/icons-material';
import useErrorCheck from '@/components/validations/hooks/useError';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    padding: '0px 20px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'end',
  },
};
const SongsEditCard = ({
  editableSong,
  tags,
  onEditSongClick,
  onSongChange,
  onSongSave,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  const validations = {
    name: {
      type: 'isEmpty',
      text: 'songs.nameIsRequired',
    },
    lang: {
      type: 'isEmpty',
      text: 'songs.langIsRequired',
    },
  };

  const {
    getActivateError,
    isError,
  } = useErrorCheck({
    values: editableSong,
    validations,
  });

  const handleSave = async () => {
    const err = getActivateError();

    if (!err) {
      await onSongSave();
    }
  };

  const {
    name,
    tags: songTags,
    lang,
  } = editableSong;

  return (
    <Card sx={{
      maxWidth: 345,
      marginBottom: '10px',
    }}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item xs={12}>
            <CustomTextField
              uiLibrary="mui"
              label={t('name')}
              value={name}
              onChange={({ value }) => onSongChange('name', value)}
              fullWidth
              className={classes.textField}
              error={isError('name')}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomCheckboxAutocomplete
              options={tags.map(tagName => ({
                key: tagName,
                name: tagName,
              }))}
              value={songTags}
              label={t('tags')}
              openOnFocus
              onChange={({ value }) => onSongChange('tags', value)}
              size="small"
              freeSolo
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelect
              label={t('languages')}
              value={lang}
              options={SongLanguages.map(langOption => ({
                text: langOption,
                value: langOption,
              }))}
              onChange={({ value }) => onSongChange('lang', value)}
              size="small"
              error={isError('lang')}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <Grid item xs={3} className={classes.actions}>
          <IconButton
            size="large"
            color="error"
            onClick={() => onEditSongClick(null)}
          >
            <ClearRounded/>
          </IconButton>
          <IconButton
            size="large"
            color="success"
            onClick={handleSave}
          >
            <CheckRounded/>
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SongsEditCard;

SongsEditCard.propTypes = {
  editableSong: PropTypes.object,
  tags: PropTypes.array,
  onEditSongClick: PropTypes.func,
  onSongChange: PropTypes.func,
  onSongSave: PropTypes.func,
};
