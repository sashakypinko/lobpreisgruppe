import {
  AppBar, Grid,
  Toolbar,
} from '@mui/material';

import RouteCondition from '@/components/routes/RouteCondition';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import useClasses from '@/components/layout/hooks/useClasses';

import { HeaderText } from './HeaderLogo';
import HeaderSearch from './HeaderSearch';

const styles = {
  appBar: {
    zIndex: 500,
    backgroundColor: '#000',
    '@media (max-width: 600px)': {
      padding: '20px 4px 0 4px',
    },
  },
  catalogueUpdate: {
    color: 'white',
    marginLeft: '70%',
    cursor: 'pointer',
    '@media (max-width: 1200px)': {
      marginLeft: '50%',
    },
    '@media (max-width: 600px)': {
      marginLeft: 0,
      textAlign: 'center',
    },
  },
};

const FiltersHeader = () => {
  const classes = useClasses(styles);

  return (
    <RouteCondition
      path={UrlEnums.CATALOG}
    >
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={3}>
              <HeaderText />
            </Grid>
            <Grid item xs={12} md={6}>
              <HeaderSearch />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </RouteCondition>
  );
};

export default FiltersHeader;
