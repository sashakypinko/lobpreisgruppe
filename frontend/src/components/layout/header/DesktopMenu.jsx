import {
  IconButton,
  MenuItem,
  Menu,
  Badge,
  Box,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import i18n from '@/components/translations/i18n';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const menuId = 'primary-search-account-menu';

const menu = [
  {
    authorizations: { authenticated: true },
    component:
      ({ onClick }) => (
        <IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
          onClick={onClick}
          size="large"
        >
          <AccountCircle />
          <Box sx={{ pb: 4 }}>
            <Badge color="primary" />
          </Box>
        </IconButton>
      ),
    onClick: 'handleProfileMenuOpen',
    text: i18n.t('profile'),
  },
];

const ProfileMenu = ({
  anchorEl,
  handleMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const { t } = useTranslation();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div>
        <Authorized authenticated>
          <CustomLink plain to={UrlEnums.LOGOUT}>
            <MenuItem onClick={handleMenuClose}>{t('logout')}</MenuItem>
          </CustomLink>
        </Authorized>
        <Authorized publicOnly>
          <CustomLink plain to="/login"><MenuItem onClick={handleMenuClose}>{t('login')}</MenuItem></CustomLink>
        </Authorized>
      </div>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleMenuClose: PropTypes.func.isRequired,
};

const DesktopMenuSection = ({ onClick }) => (
  <div style={{ display: 'flex' }}>
    <Authorized authenticated>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
        onClick={onClick}
        size="large"
      >
        <Badge color="error">
          <AccountCircle fontSize="large" />
        </Badge>
      </IconButton>
    </Authorized>
  </div>
);

DesktopMenuSection.propTypes = {
  onClick: PropTypes.func,
};

export { ProfileMenu, DesktopMenuSection, menu };
