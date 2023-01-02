import {
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton, ListItemButton,
} from '@mui/material';
import {
  LockOutlined,
  Home,
  Language,
  LibraryMusicOutlined,
  AdminPanelSettings,
  CampaignRounded,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import HeaderLogo from '@/components/layout/header/HeaderLogo';
import useClasses from '@/components/layout/hooks/useClasses';
import CloseIcon from '@/components/icons/CloseIcon';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--theme-spacing-0_1)',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  dividerTitlePadding: {
    padding: '2.2em 0 5px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  dividerTitle: {
    fontWeight: '500',
    fontSize: '120%',
  },
  sidebarLogo: {
    position: 'absolute',
    left: '20px',
  },
  list: {
    width: '100%',
  },
  listItemText: {
    fontWeight: '500',
    fontSize: '120%',
  },
  listItemIcon: { color: 'rgb(20, 20, 20)' },
  iconButton: { color: 'rgb(20, 20, 20)' },
});

const SidebarListItem = ({
  path,
  text,
  Icon,
  listItemProps,
  ...rest
}) => {
  const classes = useClasses(styles);
  return (
    <CustomLink plain to={path}>
      <ListItemButton {...rest}>
        {Icon && (
          <ListItemIcon className={classes.listItemIcon}>
            <Icon/>
          </ListItemIcon>
        )}
        <ListItemText
          primary={text}
          classes={{
            primary: classes.listItemText,
          }}
          {...listItemProps}
        />
      </ListItemButton>
    </CustomLink>
  );
};

SidebarListItem.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  listItemProps: PropTypes.object,
};

const Sidebar = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.drawerHeader}>
        <div className={classes.sidebarLogo}>
          <HeaderLogo/>
        </div>
        <IconButton className={classes.iconButton} size="large">
          <CloseIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        {/* <SidebarListItem Icon={Home} path={UrlEnums.MAIN} key="home" text={t('home')}/> */}
        <Authorized publicOnly>
          <SidebarListItem Icon={LockOutlined} path={UrlEnums.LOGIN} key="login" text={t('login')}/>
        </Authorized>
        <Authorized authenticated>
          <SidebarListItem Icon={LibraryMusicOutlined} path={UrlEnums.SONGS} key="songs" text={t('songs')}/>
        </Authorized>
        <Authorized authenticated>
          <SidebarListItem Icon={CampaignRounded} path={UrlEnums.PRAISES} key="praises" text={t('praises')}/>
        </Authorized>
        <Divider/>
        <div className={classes.dividerTitlePadding}>
          <div className={classes.dividerTitle}>
            <ListItemIcon sx={{ color: 'firebrick' }}>
              <AdminPanelSettings/>
              {t('sidebar.adminArea.title')}
            </ListItemIcon>
          </div>
        </div>
        <Authorized adminOnly>
          <CustomLink plain to={UrlEnums.ADMIN_TRANSLATIONS}>
            <ListItemButton>
              <ListItemIcon>
                <Language/>
              </ListItemIcon>
              <ListItemText primary={t('translations.title')}/>
            </ListItemButton>
          </CustomLink>
        </Authorized>
      </List>
    </>
  );
};

export default Sidebar;
