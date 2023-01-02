import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import _debounce from 'lodash-es/debounce';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  Toolbar,
  TextField,
  Tooltip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Close, FilterList } from '@mui/icons-material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import Hide from '@/components/layout/Hide';
import LightTableCsvButton from '@/components/tables/lightTable/tableComponents/LightTableCsvButton';

import LightTableColumnsButton from './LightTableColumnsButton';

const styles = theme => {
  const { mobileBreakpoint } = theme.tableTheme;
  return ({
    root: {
      paddingLeft: 'var(--theme-spacing-2)',
      paddingRight: 'var(--theme-spacing-1)',
    },
    highlight:
      theme.palette.mode === 'light'
        ? {
          color: 'var(--theme-palette-secondary-main)',
          backgroundColor: 'var(--theme-palette-secondary-light)',
        }
        : {
          color: 'var(--theme-palette-text-primary)',
          backgroundColor: 'var(--theme-palette-secondary-dark)',
        },
    searchField: {
      minWidth: 150,
      paddingLeft: 'var(--theme-spacing-2)',
      [theme.breakpoints.down(mobileBreakpoint)]: {
        width: '100%',
        paddingLeft: 0,
      },
    },
    spacer: {
      flex: '1 1 10%',
    },
    iconButton: { cursor: 'pointer', zIndex: 1000 },
  });
};

const debounceSearch = _debounce(
  (localSearch, setSearchText) => {
    setSearchText(localSearch);
  },
  50,
);

const SearchText = ({
  searchAutoFocus = false,
  searchText,
  setSearchText,
  localization,
  searchProps = {},
  setFocusSearch,
  isMobile,
}) => {
  const classes = useClasses(styles);
  const [localSearch, setLocalSearch] = useState(searchText);

  useEffect(() => {
    debounceSearch(localSearch, setSearchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  return (
    <TextField
      size="small"
      autoFocus={searchAutoFocus}
      className={classes.searchField}
      value={localSearch}
      onChange={event => setLocalSearch(event.target.value)}
      placeholder={localization.searchPlaceholder || 'Search'}
      onFocus={() => (isMobile ? setFocusSearch(true) : {})}
      onBlur={() => setFocusSearch(false)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title={localization.searchTooltip}>
              <Search fontSize="small" />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!localSearch}
              onClick={() => setLocalSearch('')}
              aria-label={localization.clearSearchAriaLabel}
              className={classes.iconButton}
              size="large"
            >
              <Close
                fontSize="small"
                aria-label="clear"
              />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          'aria-label': localization.searchAriaLabel,
        },
      }}
      {...searchProps}
    />
  );
};

SearchText.propTypes = {
  searchAutoFocus: PropTypes.bool,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  localization: PropTypes.object,
  searchProps: PropTypes.object,
  setFocusSearch: PropTypes.func,
  isMobile: PropTypes.bool,
};

const LightTableToolbar = ({
  title = '',
  customTitle = '',
  customTools = '',
  searchText,
  setSearchText,
  localization,
  searchProps,
  searchAutoFocus,
  columnsButton = true,
  exportFileName = '',
  withExport = false,
  tableKey,
  columns,
  rows,
  onColumnsChanged,
  columnsToDisplay,
  filterActive,
  setFilterActive,
  filtering,
}) => {
  const classes = useClasses(styles);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('md'));
  const [focusSearch, setFocusSearch] = useState(false);

  const { tableTheme } = theme;
  const { hiddenUp } = tableTheme;

  const expandSearch = isMobile && focusSearch;

  useEffect(() => {
    if (!isMobile && !filterActive) {
      setFilterActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <>
      {customTitle}
      <Toolbar
        className={classes.root}
      >
        {customTools}
        {!expandSearch && (
          <>
            <Typography component="div">
              {title}
            </Typography>
            <div className={classes.spacer} />
          </>
        )}
        <SearchText
          searchAutoFocus={searchAutoFocus}
          searchText={searchText}
          setSearchText={setSearchText}
          localization={localization}
          searchProps={searchProps}
          setFocusSearch={setFocusSearch}
          isMobile={isMobile}
        />
        {!expandSearch && filtering && (
          <Hide {...hiddenUp}>
            <IconButton
              aria-label="Activate filter"
              onClick={() => setFilterActive(!filterActive)}
              size="large"
            >
              <FilterList
                fontSize="small"
                aria-label="clear"
              />
            </IconButton>
          </Hide>
        )}
        {columnsButton && !expandSearch && (
          <LightTableColumnsButton
            localization={localization}
            columns={columns}
            onColumnsChanged={onColumnsChanged}
            columnsToDisplay={columnsToDisplay}
          />
        )}
        {withExport && (
          <LightTableCsvButton
            localization={localization}
            exportFileName={exportFileName}
            columns={columns}
            rows={rows}
            tableKey={tableKey}
          />
        )}
      </Toolbar>
    </>
  );
};

LightTableToolbar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  customTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  customTools: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  localization: PropTypes.object,
  searchProps: PropTypes.object,
  searchAutoFocus: PropTypes.object,
  columnsButton: PropTypes.bool,
  exportFileName: PropTypes.string,
  withExport: PropTypes.bool,
  tableKey: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array,
  onColumnsChanged: PropTypes.func,
  columnsToDisplay: PropTypes.array,
  filterActive: PropTypes.bool,
  setFilterActive: PropTypes.func,
  filtering: PropTypes.bool,
};

export default LightTableToolbar;
