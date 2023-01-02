import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddCircle } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import UrlHelper from '@/components/connections/UrlHelper';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import CustomLink from '@/components/inputs/CustomLink';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import SongsList from '@/screens/songs/SongsList';
import SongsFilter from '@/screens/songs/SongsFilter';
import useLoading from '@/components/loading/hooks/useLoading';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';
import DateHelper from '@/components/helpers/DateHelper';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const styles = {
  textField: {
    marginRight: 5,
    marginTop: 0,
  },
  title: {
    marginBottom: '10px',
  },
  label: {
    marginTop: '30px',
    marginBottom: '10px',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const Songs = ({
  date = null,
  inModal = false,
  onSave,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const navigate = useNavigate();
  const {
    createSuccessSnackbar,
    createErrorSnackbar,
  } = useSnackbar();
  const defaultFilters = {
    search: '',
    tags: [],
    date,
    languages: [],
    sort: {
      name: 'name',
      value: 1
    },
  };
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [editableSong, setEditableSong] = useState(null);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({ ...defaultFilters });
  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();

  const getSongs = async () => {
    setLoading(true);
    const res = await Connections.postRequest(ApiEndpoints.getSongs, { filters });

    if (res.ok) {
      setSongs(res.data.songs);
    } else {
      createErrorSnackbar(t('songs.errorGetting'));
    }
    setLoading(false);
  };

  const getTags = async () => {
    const res = await Connections.postRequest(ApiEndpoints.getAllTags);

    if (res.ok) {
      setTags(res.data.tags.map(({ name }) => name));
    }
  };

  const getSelectedSongs = async () => {
    const res = await Connections.postRequest(
      ApiEndpoints.getPraise,
      { date: DateHelper.getCorrectedDate(filters.date) },
    );

    if (res.ok) {
      setSelectedSongs(res.data.praise?.songs || []);
    } else {
      createErrorSnackbar(t('praise.errorGetting'));
    }
  };

  const updatePraise = async () => {
    if (onSave) {
      onSave(selectedSongs);
    } else {
      setLoading(true);
      const res = await Connections.postRequest(
        ApiEndpoints.updatePraise,
        {
          praise: {
            songs: selectedSongs.map(((song, index) => ({
              ...song,
              index,
            }))),
            date: DateHelper.getCorrectedDate(filters.date),
          },
        },
      );

      if (res.ok) {
        createSuccessSnackbar('praises.updatedSuccessfully');
        navigate(UrlEnums.PRAISES);
      } else {
        createErrorSnackbar('praises.updatingFailed');
      }
      setLoading(false);
    }
  };

  const handleSongSave = async () => {
    setLoading(true);

    const res = await Connections.postRequest(ApiEndpoints.updateSongs, { song: editableSong });

    if (res.ok) {
      createSuccessSnackbar('songs.updatedSuccessfully');
      setEditableSong(null);
      await getSongs();
    } else {
      createErrorSnackbar('songs.updatingFailed');
      setEditableSong(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTags()
      .then();
  }, []);

  useEffect(() => {
    getSongs()
      .then();
  }, [filters]);

  useEffect(() => {
    getSelectedSongs()
      .then();
  }, [filters.date]);

  const handleFiltersChange = newFilters => {
    setFilters(newFilters);
  };

  const handleTagClick = tag => {
    handleFiltersChange({
      ...filters,
      tags: [...filters.tags, tag],
    });
  };

  const handleLangClick = lang => {
    handleFiltersChange({
      ...filters,
      languages: [...filters.languages, lang],
    });
  };

  const handleSelectSong = (song, isSelected = true) => {
    if (isSelected) {
      setSelectedSongs([...selectedSongs, song]);
    } else {
      setSelectedSongs(selectedSongs.filter(selectedSong => selectedSong._id !== song._id));
    }
  };

  const handleSongChange = (name, values) => {
    setEditableSong({
      ...editableSong,
      [name]: values,
    });

    if (name === 'tags') {
      values.forEach(value => {
        !tags.includes(value) && setTags([...tags, value]);
      });
    }
  };

  const clearFilters = () => {
    handleFiltersChange({ ...defaultFilters });
    !inModal && setSelectedSongs([]);
  };

  return (
    <>
      <div className={classes.spaceBetween}>
        <Typography className={classes.title} variant="h1">
          {t('songs.title')}
        </Typography>
        <CustomLink plain to={UrlHelper.replaceParamsInReactUrl(UrlEnums.EDIT_SONG, { id: 'new' })}>
          <CustomButton
            uiLibrary="mui"
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
          >
            <AddCircle sx={{ mr: 1 }}/> {t('songs.addNew')}
          </CustomButton>
        </CustomLink>
      </div>
      <Grid container spacing={3}>
        <SongsFilter
          filters={filters}
          tags={tags}
          disabledSaveButton={!selectedSongs.length}
          disabledDate={inModal}
          onChange={handleFiltersChange}
          onSave={updatePraise}
          onClear={clearFilters}
        />
        <SongsList
          songs={songs}
          tags={tags}
          selectedSongs={selectedSongs}
          selectedDate={filters.date}
          loading={loading}
          Loading={Loading}
          editableSong={editableSong}
          onEditSongClick={setEditableSong}
          onSongChange={handleSongChange}
          onSongSave={handleSongSave}
          onTagClick={handleTagClick}
          onLangClick={handleLangClick}
          onSelectSong={handleSelectSong}
        />
      </Grid>
    </>
  );
};

export default Songs;

Songs.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inModal: PropTypes.bool,
  onSave: PropTypes.func,
};
