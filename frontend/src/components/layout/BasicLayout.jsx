import { useMemo } from 'react';
import { Container } from '@mui/material';
import { cx } from '@emotion/css';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import useRouteMatching from '@/components/routes/hooks/useRouteMatching';
import UrlEnums from '@/components/connections/enums/UrlEnums';

import Header from './header/Header';
import Footer from './footer/Footer';

const styles = theme => ({
  tallTopBox: {
    height: 1,
    marginTop: 'calc(0em + 140px)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 'calc(0em + 120px)',
    },
  },
  topBox: {
    height: 1,
    marginTop: 64,
    [theme.breakpoints.down('sm')]: {
      marginTop: 56,
    },
  },
  container: { marginTop: 20 },
});

const getSize = (isLarge, isXLarge) => {
  if (isLarge) return 'lg';
  if (isXLarge) return 'xl';
  return 'md';
};

const BasicLayout = ({ children }) => {
  const classes = useClasses(styles);

  const isCatalog = useRouteMatching({
    routeConditions: {
      paths: [UrlEnums.CATALOG],
    },
  });

  const isXLargeContainer = useRouteMatching({
    routeConditions: {
      paths: [
        UrlEnums.WINTER_WHEELS,
        UrlEnums.BUILDER_DEMO,
        UrlEnums.EDIT_NOTIFICATION_TEMPLATE,
        UrlEnums.VIEW_NOTIFICATION,
        UrlEnums.ADVERTISING,
      ],
    },
  });

  const containerMaxWidth = useMemo(
    () => getSize(isCatalog, isXLargeContainer),
    [isCatalog, isXLargeContainer],
  );

  return (
    <>
      <Header />
      <div
        className={cx({
          [classes.topBox]: !isCatalog,
          [classes.tallTopBox]: isCatalog,
        })}
      />
      <Container
        maxWidth={containerMaxWidth}
        className={classes.container}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default BasicLayout;

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
