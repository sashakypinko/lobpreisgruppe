import { useState } from 'react';
import {
  AppBar,
  Toolbar,
} from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import FiltersHeader from '@/components/layout/header/FiltersHeader';
import LanguageSelector from '@/components/translations/LanguageSelector';

import Drawer from '../sidebar/Drawer';
import { MobileMenu } from './MobileMenu';
import { ProfileMenu, DesktopMenuSection } from './DesktopMenu';
import HeaderLogo from './HeaderLogo';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  block: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  appWrapper: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
});

const Header = () => {
  const classes = useClasses(styles);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="inherit" variant="outlined" elevation={0}>
        <Toolbar className={classes.appWrapper}>
          <HeaderLogo />
          <div className={classes.block} />
          <LanguageSelector />
          <DesktopMenuSection
            onClick={handleProfileMenuOpen}
          />
          <Drawer />
        </Toolbar>
        <FiltersHeader />
      </AppBar>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
};

export default Header;
