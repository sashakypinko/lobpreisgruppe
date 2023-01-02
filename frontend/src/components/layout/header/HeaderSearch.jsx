import { useEffect, useState } from 'react';
import {
  InputBase, Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import UrlHelper from '@/components/connections/UrlHelper';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - (var(--theme-spacing-1)))',
  },
  input: {
    marginLeft: 'var(--theme-spacing-1)',
    flex: 1,
  },
  iconButton: {
    padding: 5,
    color: 'var(--theme-palette-primary-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
};

const setSearchTermAsUrl = searchValue => {
  if (searchValue) {
    UrlHelper.setParams(
      [{
        name: 'searchTerm',
        value: searchValue,
      },
      {
        name: 'page',
        value: 1,
      }],
    );
  } else {
    UrlHelper.deleteParams(['searchTerm', 'page']);
  }
};

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  useLocation();

  const searchTerm = UrlHelper.getParam('searchTerm', '');

  useEffect(() => {
    searchTerm !== searchValue && setSearchValue(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    let mounted = true;
    const handler = setTimeout(() => {
      if (mounted && searchValue !== searchTerm) {
        setSearchTermAsUrl(searchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, searchTerm]);

  const classes = useClasses(styles);
  const { t } = useTranslation();

  const handleChangeSearch = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const onKeyPress = e => {
    const { key } = e;
    if (key === 'Enter') {
      setSearchTermAsUrl(searchValue);
    }
  };

  return (
    <Paper className={classes.paper}>
      <InputBase
        className={classes.input}
        placeholder={`${t('search')}...`}
        inputProps={{ 'aria-label': t('search') }}
        type="search"
        value={searchValue}
        onChange={handleChangeSearch}
        onKeyPress={onKeyPress}
      />
    </Paper>
  );
};

export default HeaderSearch;
