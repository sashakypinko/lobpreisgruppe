import { useEffect, useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from '@/components/loading/Loading';
import useMobile from '@/components/layout/hooks/useMobile';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    '& > *': {
      marginTop: 'var(--theme-spacing-2)',
    },
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },
  showOneRoot: {
    display: 'inline-block',
    minWidth: 84,
  },
  pagination: {
    display: 'inline-block',
  },
  dontShow: {
    display: 'none',
  },
  bigPage: {
    width: 40,
    height: 40,
  },
};

const CustomPagination = ({
  loading, page, perPage, totalLength,
}) => {
  const [pPage, setPPage] = useState(1);
  const classes = useClasses(styles);
  const { isMobile } = useMobile();
  const location = useLocation();

  const handleChange = (event, value) => {
    window.scrollTo({ top: 0, left: 0 });
    setPPage(value);
  };

  useEffect(() => {
    if (page !== pPage) {
      setPPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.ceil(totalLength / perPage) || 1;
  if (totalPages < 2) return <div className={classes.dontShow} />;

  const query = new URLSearchParams(location.search);

  return (
    loading ? <Loading /> : (
      <Pagination
        page={pPage}
        onChange={handleChange}
        className={classes.pagination}
        count={totalPages}
        color="primary"
        size="large"
        siblingCount={isMobile ? 0 : 1}
        renderItem={item => {
          const {
            page: itemPage,
            type,
          } = item;
          query.set('page', `${itemPage}`);
          const newUrl = `${location.pathname}?${query.toString()}`;
          if (
            type === 'end-ellipsis'
                || type === 'start-ellipsis'
          ) return <div />;
          return (
            <PaginationItem
              component={Link}
              className={classes.bigPage}
              to={newUrl}
              {...item}
            />
          );
        }}
      />
    )
  );
};

export default CustomPagination;

CustomPagination.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalLength: PropTypes.number,
};
