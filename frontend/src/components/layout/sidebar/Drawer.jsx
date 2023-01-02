import { useState } from 'react';
import {
  Drawer as MuiDrawer, SvgIcon,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

import useClasses from '@/components/layout/hooks/useClasses';

import Sidebar from './Sidebar';

const drawerWidth = 400;

const styles = theme => ({
  list: {
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerDiv: {
    marginLeft: 12,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0 !important',
      button: {
        paddingRight: 0,
      },
    },
  },
});

const Drawer = () => {
  const classes = useClasses(styles);
  const [open, setOpen] = useState(false);

  const toggleDrawer = openDrawer => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(openDrawer);
  };

  return (
    <div className={classes.drawerDiv}>
      <MuiDrawer
        className={classes.drawer}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Sidebar />
        </div>
      </MuiDrawer>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        size="large"
      >
        <SvgIcon>
          <svg viewBox="0 0 24 24" className="_SiteNav-df _SiteNav-dg _SiteNav-dh _SiteNav-di _SiteNav-dj _SiteNav-dk">
            <g fill="currentColor">
              <rect x="1" y="4" width="22" height="1" rx=".5" />
              <rect x="5" y="11" width="18" height="1" rx=".5" />
              <rect x="3" y="18" width="20" height="1" rx=".5" />
            </g>
          </svg>
        </SvgIcon>
      </IconButton>
    </div>
  );
};

export default Drawer;
