import {
  useTheme,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import useClasses from '@/components/layout/hooks/useClasses';
import Hide from '@/components/layout/Hide';

import LightTableFilterCell from './LightTableFilterCell';

const styles = theme => {
  const { mobileBreakpoint } = theme.tableTheme;
  return ({
    tableRow: {
      [theme.breakpoints.down(mobileBreakpoint)]: {
        borderBottom: '6px solid #ddd',
        '& td:last-child': {
          border: 'none',
        },
      },
    },
    closeFilter: {
      padding: 0,
      float: 'right',
      border: 0,
    },
  });
};

const LightTableFilterRow = ({
  columns,
  filterRowStyle = {},
  columnsToDisplay,
  setFilterActive,
  filterActive,
  ...rest
}) => {
  const classes = useClasses(styles);
  const theme = useTheme();
  const { tableTheme } = theme;
  const { hiddenUp } = tableTheme;

  return (
    <>
      <Hide {...hiddenUp}>
        <TableRow>
          <TableCell className={classes.closeFilter}>
            <IconButton onClick={() => setFilterActive(false)} size="large"><Close /></IconButton>
          </TableCell>
        </TableRow>
      </Hide>
      <TableRow
        style={{
          ...filterRowStyle,
        }}
        className={classes.tableRow}
      >
        {columns.map((column, columnIndex) => {
          const rowKey = `filter-cell-${column.key ?? columnIndex}`;
          if (!columnsToDisplay.includes(columnIndex)) {
            return <Fragment key={rowKey} />;
          }
          return (
            <LightTableFilterCell
              key={rowKey}
              column={column}
              columnIndex={columnIndex}
              {...rest}
            />
          );
        })}
      </TableRow>
    </>
  );
};

LightTableFilterRow.propTypes = {
  columns: PropTypes.array,
  filterRowStyle: PropTypes.bool,
  columnsToDisplay: PropTypes.array,
  setFilterActive: PropTypes.func,
  filterActive: PropTypes.bool,
};

export default LightTableFilterRow;
