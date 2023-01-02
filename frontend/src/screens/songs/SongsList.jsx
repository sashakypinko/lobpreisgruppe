import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import SongsViewCard from '@/screens/songs/SongsViewCard';
import SongsEditCard from '@/screens/songs/SongsEditCard';

const styles = {};

const SongsList = ({
  songs,
  tags,
  selectedSongs,
  editableSong,
  loading,
  Loading,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  if (loading) return <Loading/>;

  return (
    <>
      {
        songs.map(song => {
          const isSelected = selectedSongs.find(selectedSong => selectedSong._id === song._id);

          return (
            <Grid item xs={12} md={6} key={song._id}>
              {
                editableSong && editableSong._id === song._id
                  ? (
                    <SongsEditCard
                      editableSong={editableSong}
                      tags={tags}
                      {...rest}
                    />
                  )
                  : (
                    <SongsViewCard
                      song={song}
                      isSelected={isSelected}
                      {...rest}
                    />
                  )
              }
            </Grid>
          );
        })
      }
    </>
  );
};

export default SongsList;

SongsList.propTypes = {
  songs: PropTypes.array,
  tags: PropTypes.array,
  editableSong: PropTypes.object,
  selectedSongs: PropTypes.array,
  loading: PropTypes.bool,
  Loading: PropTypes.func,
};
