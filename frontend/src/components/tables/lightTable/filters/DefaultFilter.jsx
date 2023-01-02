import { InputAdornment, TextField } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import PropTypes from 'prop-types';

import { useDebounceChangeFilter } from '@/components/tables/hooks/tableHooks';
import useClasses from '@/components/layout/hooks/useClasses';
import useMobile from '@/components/layout/hooks/useMobile';

const styles = theme => {
  const { mobileUpBreakpoint } = theme.tableTheme;
  return ({
    mobileLabel: {
      [theme.breakpoints.up(mobileUpBreakpoint)]: {
        display: 'none',
      },
    },
    defaultAdornment: { marginRight: 2 },
    filterIcon: { width: '0.7em', height: '0.7em' },
  });
};

const DefaultFilter = ({
  column, filterValue, setFilterValue, localization, columnIndex, tableToken,
}) => {
  const classes = useClasses(styles);
  const changeFilter = useDebounceChangeFilter(tableToken);
  const { isMobile } = useMobile();

  return (
    <TextField
      size="small"
      label={isMobile ? column.title : ''}
      style={column.type === 'numeric' ? { float: 'right' } : {}}
      type={column.type === 'numeric' ? 'number' : 'search'}
      value={filterValue}
      placeholder={localization.filterPlaceholder || ''}
      fullWidth
      onChange={event => {
        const newFilterValue = event.target.value;
        setFilterValue(newFilterValue);
        changeFilter(
          columnIndex,
          newFilterValue,
        );
      }}
      InputLabelProps={{
        className: classes.mobileLabel,
      }}
      InputProps={{
        'aria-label': `filter data by ${column.title}`,
        startAdornment: (
          <InputAdornment position="start" className={classes.defaultAdornment}>
            <FilterList fontSize="small" className={classes.filterIcon} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default DefaultFilter;

DefaultFilter.propTypes = {
  column: PropTypes.object.isRequired,
  filterValue: PropTypes.string,
  setFilterValue: PropTypes.func.isRequired,
  localization: PropTypes.object,
  columnIndex: PropTypes.number.isRequired,
  tableToken: PropTypes.string.isRequired,
};
