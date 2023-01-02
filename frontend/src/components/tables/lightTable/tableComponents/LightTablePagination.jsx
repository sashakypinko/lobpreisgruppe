import TablePagination from '@mui/material/TablePagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => {
  const { mobileBreakpoint } = theme.tableTheme;
  return ({
    root: {
      flexShrink: 0,
      marginLeft: 'var(--theme-spacing-2-5)',
      [theme.breakpoints.down(mobileBreakpoint)]: {
        display: 'block',
        boxSizing: 'border-box',
        textAlign: 'center',
        margin: 0,
      },
    },
    paginationToolbar: {
      [theme.breakpoints.down(mobileBreakpoint)]: {
        display: 'block',
        boxSizing: 'border-box',
        textAlign: 'center',
        marginTop: 10,
      },
    },
    paginationCaption: {
      [theme.breakpoints.down(mobileBreakpoint)]: {
        display: 'inline-block',
        boxSizing: 'border-box',
      },
    },
  });
};

const TablePaginationActions = props => {
  const classes = useClasses(styles);
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange: globalOnPageChange, nextIconButtonProps,
  } = props;

  const {
    options,
  } = nextIconButtonProps;
  const { mobileScrollOnPageChange = true } = options;

  const isMobile = !useMediaQuery(theme.breakpoints.up('md'));

  const onPageChange = (e, newPage) => {
    if (isMobile && mobileScrollOnPageChange) { window.scrollTo(0, 0); }
    globalOnPageChange(e, newPage);
  };

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  nextIconButtonProps: PropTypes.shape({
    options: PropTypes.shape({
      mobileScrollOnPageChange: PropTypes.bool,
    }),
  }).isRequired,
};

const LightTablePagination = ({
  ...rest
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  return (
    <TablePagination
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
      labelRowsPerPage={t('table.rowsPerPage')}
      component="div"
      colSpan={3}
      ActionsComponent={TablePaginationActions}
      nextIconButtonProps={{
        options: rest.options,
      }}
      classes={{
        toolbar: classes.paginationToolbar,
        caption: classes.paginationCaption,
      }}
      {...rest}
    />
  );
};

export default LightTablePagination;
