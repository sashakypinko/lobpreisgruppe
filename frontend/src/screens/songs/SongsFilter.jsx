import { useTranslation } from 'react-i18next';
import { Grid, IconButton, Popover, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import CustomTextField from '@/components/inputs/CustomTextField';
import CustomCheckboxAutocomplete from '@/components/inputs/CustomCheckboxAutocomplete';
import CustomDatePicker from '@/components/inputs/CustomDatePicker';
import {
  CheckRounded,
  ClearRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  SortRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import { SongLanguages } from '@/screens/songs/enums/SongEnums';

const styles = {
  container: {
    padding: '22px',
  },
  actionButton: {
    marginTop: '17px !important',
  },
  popover: {
    width: '180px',
    overflow: 'inherit',
    borderRadius: '7px',
    padding: '12px',
  },
  sortItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sortName: {
    marginRight: '8px',
  },
  sortButton: {
    marginTop: '-2px',
    cursor: 'pointer',
    color: '#bfbfbf',
  },
  sortActive: {
    color: '#141414',
  },
};

const sortFields = ['name', 'lang', 'lastUsingDate'];

const SongsFilter = ({
  filters,
  tags,
  disabledSaveButton,
  disabledDate,
  onChange,
  onClear,
  onSave,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const [sortAnchor, setSortAnchor] = useState(null);

  const handleFilterChange = ({
    name,
    value,
  }) => {
    onChange({
      ...filters,
      [name]: value,
    });
  };

  const handleSortChange = (value, name) => {
    onChange({
      ...filters,
      sort: {
        name,
        value,
      },
    });
  };

  const {
    search,
    tags: selectedTags,
    date,
    languages,
  } = filters;

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item xs={12} md={3}>
        <CustomTextField
          uiLibrary="mui"
          label={t('search')}
          name="search"
          value={search}
          onChange={handleFilterChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomCheckboxAutocomplete
          options={tags.map(tagName => ({
            key: tagName,
            name: tagName,
          }))}
          value={selectedTags}
          label={t('tags')}
          name="tags"
          openOnFocus
          onChange={handleFilterChange}
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <CustomCheckboxAutocomplete
          options={SongLanguages.map(lang => ({
            key: lang,
            name: lang,
          }))}
          value={languages}
          label={t('languages')}
          name="languages"
          onChange={handleFilterChange}
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <CustomDatePicker
          value={date}
          minDate={new Date()}
          placeholder={t('date')}
          onChange={value => handleFilterChange({
            value,
            name: 'date',
          })}
          disabled={disabledDate}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <IconButton
              size="large"
              className={classes.actionButton}
              aria-label="sort"
              onClick={({ currentTarget }) => setSortAnchor(currentTarget)}
            >
              <SortRounded style={{ fontSize: '20px' }}/>
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              size="large"
              color="error"
              className={classes.actionButton}
              onClick={onClear}
            >
              <ClearRounded style={{ fontSize: '20px' }}/>
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              size="large"
              color="success"
              className={classes.actionButton}
              onClick={onSave}
              disabled={disabledSaveButton}
            >
              <CheckRounded style={{ fontSize: '20px' }}/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Popover
        open={!!sortAnchor}
        anchorEl={sortAnchor}
        onClose={() => setSortAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{ style: styles.popover }}
      >
        <Grid container spacing={2}>
          {
            sortFields.map(field => (
              <Grid key={field} item xs={12} className={classes.sortItem}>
                <Typography variant="h6" className={classes.sortName}>
                  {t(field)}
                </Typography>
                <span>
                  <ExpandLessRounded
                    className={
                      `${classes.sortButton} ${(
                        filters.sort.name === field && filters.sort.value === 1
                      ) && classes.sortActive}`
                    }
                    onClick={() => handleSortChange(1, field)}
                  />
                  <ExpandMoreRounded
                    className={
                      `${classes.sortButton} ${(
                        filters.sort.name === field && filters.sort.value === -1
                      ) && classes.sortActive}`
                    }
                    onClick={() => handleSortChange(-1, field)}
                  />
                </span>
              </Grid>
            ))
          }
        </Grid>
      </Popover>
    </Grid>
  );
};

export default SongsFilter;

SongsFilter.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    tags: PropTypes.array,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    languages: PropTypes.array,
    sort: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
  }),
  tags: PropTypes.array,
  disabledSaveButton: PropTypes.bool,
  disabledDate: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSave: PropTypes.func,
};
