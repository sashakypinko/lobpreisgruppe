import { useState } from 'react';
import {
  TableCell,
} from '@mui/material';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import LookupFilter from '@/components/tables/lightTable/filters/LookupFilter';
import BooleanFilter from '@/components/tables/lightTable/filters/BooleanFilter';
import DefaultFilter from '@/components/tables/lightTable/filters/DefaultFilter';

const styles = theme => {
  const { mobileBreakpoint } = theme.tableTheme;
  return ({
    tableCell: {
      position: 'relative',
      [theme.breakpoints.down(mobileBreakpoint)]: {
        display: 'inline-block',
        width: '100%',
        boxSizing: 'border-box',
        padding: 8,
      },
    },
  });
};

const ComponentForColumn = props => {
  const {
    column, columnIndex, filterValue,
  } = props;
  if (column.filtering === false) {
    return null;
  }

  if (column.field) {
    if (column.filterComponent) {
      return column.filterComponent(column, columnIndex, filterValue);
    }
    if (column.lookup) {
      return (
        <LookupFilter
          {...props}
        />
      );
    }
    if (column.type === 'boolean') {
      return (
        <BooleanFilter
          {...props}
        />
      );
    }
    return (
      <DefaultFilter
        {...props}
      />
    );
  }
};

ComponentForColumn.propTypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  filterValue: PropTypes.any,
};

const LightTableFilterCell = ({
  column,
  columnIndex,
  localization,
  tableToken,
}) => {
  const classes = useClasses(styles);
  const [filterValue, setFilterValue] = useState('');

  return (
    <TableCell
      key={`filter-cell-${column.key || columnIndex}`}
      style={{
        ...column.filterCellStyle,
      }}
      className={classes.tableCell}
    >
      <ComponentForColumn
        column={column}
        filterValue={column.type === 'boolean' ? !!filterValue : filterValue}
        setFilterValue={setFilterValue}
        localization={localization}
        columnIndex={columnIndex}
        tableToken={tableToken}
      />
    </TableCell>
  );
};

LightTableFilterCell.propTypes = {
  column: PropTypes.object,
  columnIndex: PropTypes.number,
  localization: PropTypes.object,
  tableToken: PropTypes.string,
};

export default LightTableFilterCell;
