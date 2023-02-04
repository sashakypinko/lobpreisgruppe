import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
  Rating,
} from '@mui/material';
import {
  CheckCircleRounded, EditRounded,
  RadioButtonUncheckedRounded,
} from '@mui/icons-material';

import useClasses from '@/components/layout/hooks/useClasses';
import { SongLanguageColors } from '@/screens/songs/enums/SongEnums';

const styles = {
  image: {
    width: '60px',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '17px 0 17px 17px',
  },
  cardContent: {},
  schedulerRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagBadge: {
    cursor: 'pointer',
  },
  editButton: {
    top: '-28px',
    padding: '0',
    width: '40px',
  },
};

const GREEN_PERIOD = 30;
const YELLOW_PERIOD = 20;

const calculateRating = ratings =>  ratings.map(({ rating }) => rating).reduce((a, b) => a + b, 0) / ratings.length;

const SongsViewCard = ({
  song,
  isSelected,
  selectedDate,
  onEditSongClick,
  onTagClick,
  onLangClick,
  onSelectSong,
  onUpdateRating,
}) => {
  const classes = useClasses(styles);

  const getLastUsingDateColor = lastUsingDate => {
    if (!selectedDate) {
      return 'primary';
    }

    const preparedLastUsingDate = new Date(lastUsingDate);
    const diffTime = Math.abs(selectedDate - preparedLastUsingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= GREEN_PERIOD) return 'success';
    if (diffDays >= YELLOW_PERIOD) return 'warning';
    return 'error';
  };

  const {
    _id,
    name,
    tags,
    lang = '',
    lastUsingDate,
    ratings = [],
  } = song;

  const date = lastUsingDate ? new Date(lastUsingDate).toLocaleDateString('de', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }) : false;

  const rating = calculateRating(ratings);

  return (
    <Card sx={{
      maxWidth: 345,
      marginBottom: '10px',
    }}>
      <CardContent className={classes.cardContent}>
        <Grid container className={classes.nameContainer}>
          <Grid item xs={3}>
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
          <Grid item xs={1}>
            <IconButton
              className={classes.editButton}
              size="large"
              color="warning"
              onClick={() => onEditSongClick(song)}
            >
              <EditRounded fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              {
                tags.map(tag => (
                  <Chip
                    label={tag}
                    className={classes.tagBadge}
                    color="success"
                    variant="outlined"
                    size="small"
                    key={tag}
                    onClick={() => onTagClick(tag)}
                  />
                ))
              }
            </Stack>
          </Grid>
          <Grid item xs={12} className={classes.schedulerRow}>
            <Chip
              className={classes.tagBadge}
              label={lang.toUpperCase()}
              color={SongLanguageColors[lang]}
              variant="filled"
              size="small"
              onClick={() => onLangClick(lang)}
            />
            <Rating
              value={rating}
              precision={0.5}
              onChange={(e, val) => onUpdateRating(_id, val || rating)}
            />
            <span>
              {
                date && <Chip size="small" label={date} color={getLastUsingDateColor(lastUsingDate)}/>
              }
              {
                selectedDate && (
                  <IconButton
                    style={{padding: '0 0 0 7px !important'}}
                    onClick={() => onSelectSong(song, !isSelected)}
                  >
                    {
                      isSelected
                        ? <CheckCircleRounded color="success"/>
                        : <RadioButtonUncheckedRounded/>
                    }
                  </IconButton>
                )
              }
            </span>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SongsViewCard;

SongsViewCard.propTypes = {
  song: PropTypes.object,
  isSelected: PropTypes.bool,
  selectedDate: PropTypes.object,
  onEditSongClick: PropTypes.func,
  onTagClick: PropTypes.func,
  onLangClick: PropTypes.func,
  onSelectSong: PropTypes.func,
  onUpdateRating: PropTypes.func,
};
