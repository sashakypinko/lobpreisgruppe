import { useState } from 'react';
import { Card, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  CalendarMonthRounded,
  CheckCircleOutlineRounded, CheckRounded, DeleteForeverRounded, EditRounded,
  HighlightOffRounded,
  RemoveCircleOutlineRounded,
} from '@mui/icons-material';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { useTranslation } from 'react-i18next';

import DateHelper from '@/components/helpers/DateHelper';
import useClasses from '@/components/layout/hooks/useClasses';
import ArrayHelper from '@/components/helpers/ArrayHelper';
import SongsModal from '@/screens/praises/SongsModal';
import useConfirm from '@/components/dialogs/hooks/useConfirm';

const styles = {
  image: {
    width: '30px',
    color: '#fafafa !important',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    marginBottom: '5px',
  },
  cardContent: {
    padding: '7px 8px !important',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'end',
  },
};

const getCalendarColorByDate = date => {
  const dayName = new Date(date).toLocaleDateString('en', { weekday: 'long' });

  switch (dayName) {
    case 'Friday':
      return '#d32f2f';
    case 'Sunday':
      return '#2e7d32';
    default:
      return '#227db5';
  }
};

const SortableItem = sortableElement(({
  song,
  onRemove,
}) => {
  const classes = useClasses(styles);
  const {
    _id,
    name,
  } = song;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.alignCenter}>
          <Grid item xs={2}>
            <img
              className={classes.image}
              src="/img/music.png"
              alt="music.png"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h3" color="text.secondary">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              sx={{ color: 'firebrick' }}
              aria-label="remove"
              onClick={() => onRemove(_id)}
            >
              <RemoveCircleOutlineRounded style={{ pointerEvents: 'none' }}/>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

const SortableContainer = sortableContainer(({ children }) => (
  <Grid>{children}</Grid>
));

const PraiseItem = ({
  praise,
  onEdit,
  onDelete,
  onConfirm,
}) => {
  const {
    _id,
  } = praise;
  const { t, i18n } = useTranslation();
  const classes = useClasses(styles);
  const [songs, setSongs] = useState([...praise.songs] || []);
  const [openSongsModal, setOpenSongsModal] = useState(false);
  const {
    ConfirmDialog,
    openDialog,
  } = useConfirm();

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }) => {
    setSongs(arrayMoveImmutable(songs, oldIndex, newIndex));
  };

  const handleAddSongs = newSongs => {
    setOpenSongsModal(false);
    setSongs(newSongs);
  };

  const handleRemove = _id => {
    setSongs(songs.filter(song => song._id !== _id));
  };

  const handleSave = () => {
    onEdit({
      ...praise,
      songs: songs.map(((song, index) => ({
        ...song,
        index,
      }))),
    });
  };

  const handleCancel = () => {
    setSongs([...praise.songs]);
  };

  const handleDeletePraise = async () => {
    await openDialog(
      t('praises.sureToDeleteItem'),
      () => onDelete(_id),
    );
  };

  const handleConfirmPraise = async () => {
    await openDialog(
      t('praises.sureToConfirmItem'),
      () => onConfirm(_id),
    );
  };

  const date = DateHelper.getCorrectedDate(new Date(praise.date), -1);

  const hasChanges = !ArrayHelper.arraysEqual(praise.songs, songs);

  return (
    <Grid item xs={12} md={6} key={_id}>
      {ConfirmDialog}
      <Card sx={{
        maxWidth: 345,
        marginBottom: '10px',
      }}
      >
        <CardContent className={classes.cardContent}>
          <Grid container className={classes.nameContainer}>
            <Grid item xs={3}>
              <CalendarMonthRounded style={{
                fontSize: '50px',
                color: getCalendarColorByDate(date),
              }}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h1" color="text.secondary">
                {DateHelper.getFormattedDate(date, i18n.language)}
              </Typography>
            </Grid>
            {
              hasChanges && (
                <Grid item xs={4}>
                  <IconButton
                    sx={{ color: 'green' }}
                    aria-label="remove"
                    onClick={handleSave}
                  >
                    <CheckCircleOutlineRounded/>
                  </IconButton>
                  <IconButton
                    sx={{ color: 'firebrick' }}
                    aria-label="cancel"
                    onClick={handleCancel}
                  >
                    <HighlightOffRounded/>
                  </IconButton>
                </Grid>
              )
            }
          </Grid>
          <Divider/>
          <SortableContainer
            axis="y"
            lockAxis="y"
            onSortEnd={onSortEnd}
          >
            {songs.map((song, index) => (
              <SortableItem
                key={`item-${song._id}`}
                index={index}
                song={song}
                onRemove={handleRemove}
              />
            ))}
          </SortableContainer>
          <Grid
            className={classes.actions}
            spacing={1}
            container
          >
            <Grid item xs={3} className={classes.actions}>
              <IconButton
                size="large"
                color="error"
                onClick={handleDeletePraise}
              >
                <DeleteForeverRounded/>
              </IconButton>
              <IconButton
                size="large"
                color="primary"
                onClick={() => setOpenSongsModal(true)}
              >
                <EditRounded/>
              </IconButton>
              <IconButton
                size="large"
                color="success"
                onClick={handleConfirmPraise}
              >
                <CheckRounded/>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <SongsModal
        open={openSongsModal}
        date={new Date(date)}
        onClose={() => setOpenSongsModal(false)}
        onAdd={handleAddSongs}
      />
    </Grid>
  );
};

export default PraiseItem;

PraiseItem.propTypes = {
  praise: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
};
