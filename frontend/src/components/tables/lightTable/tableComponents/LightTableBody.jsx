import { Fragment, useMemo } from 'react';
import {
  FormHelperText, TableBody, TableCell, TableRow,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import Hide from '@/components/layout/Hide';

import TableHelper from '../tableHelpers/TableHelper';
import LightTableFilterRow from '../filters/LightTableFilterRow';
import LightTableSortRow from './LightTableSortRow';

const styles = theme => {
  const { mobileBreakpoint } = theme.tableTheme;
  return ({
    tableCell: {
      [theme.breakpoints.down(mobileBreakpoint)]: {
        display: 'inline-block',
        width: '100%',
        boxSizing: 'border-box',
        padding: 8,
      },
    },
    cellTitleInline: {
      width: '100%',
    },
    tableRow: {
      [theme.breakpoints.down(mobileBreakpoint)]: {
        borderBottom: '6px solid #ddd',
        '& td:last-child': {
          border: 'none',
        },
      },
    },
  });
};

const CellTitle = ({
  column,
}) => {
  const classes = useClasses(styles);
  const theme = useTheme();
  const { tableTheme } = theme;
  const { hiddenUp } = tableTheme;

  const {
    title,
    customCellTitle,
    cellTitleType,
  } = column;

  if (customCellTitle) {
    return customCellTitle({ column });
  }

  if (cellTitleType === 'none') return null;

  if (cellTitleType === 'inline') {
    return (
      <div className={classes.cellTitleInline}>
        {title}
      </div>
    );
  }

  return (
    <Hide {...hiddenUp}>
      <FormHelperText>
        {title}
      </FormHelperText>
    </Hide>
  );
};

CellTitle.propTypes = {
  column: PropTypes.object.isRequired,
};

const CellBody = ({
  column, row,
}) => {
  const {
    render: Render,
    renderProps,
    field,
  } = column || {};

  if (Render) {
    return <Render row={row} column={column} renderProps={renderProps} />;
  }
  return row[field] ?? '';
};

CellBody.propTypes = {
  column: PropTypes.object,
  row: PropTypes.object,
};

const LightTableBody = ({
  order,
  orderBy,
  rowsPerPage,
  bodyClasses,
  rowClasses,
  bodyProps,
  rowProps,
  tableProps,
  rows,
  page,
  columns,
  columnsToDisplay,
  options,
  localization,
  filterActive,
  setFilterActive,
  onRequestSort,
  tableToken,
  hideEmptyRows,
}) => {
  const { filtering } = options;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classes = useClasses(styles);

  const sortedRows = useMemo(() => TableHelper.prepareRows(
    rows,
    {
      columns,
      order,
      orderBy,
    },
    page,
    rowsPerPage,
  ), [rows, columns, order, orderBy, page, rowsPerPage]);

  return (
    <TableBody className={bodyClasses} {...bodyProps}>
      <LightTableSortRow
        columns={columns}
        orderBy={orderBy}
        order={order}
        onRequestSort={onRequestSort}
        columnsToDisplay={columnsToDisplay}
      />
      {
        filtering && filterActive && (
          <LightTableFilterRow
            columns={columns}
            localization={localization}
            columnsToDisplay={columnsToDisplay}
            filterActive={filterActive}
            setFilterActive={setFilterActive}
            tableToken={tableToken}
          />
        )
      }
      {sortedRows.map((row, index) => {
        const { key: rowKey = `table-row-${index}` } = row || {};
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={rowKey}
            className={`${classes.tableRow} ${rowClasses}`}
            {...rowProps}
          >
            {columns.map((column, columnIndex) => {
              const {
                cellProps = {}, key,
              } = column || {};

              const columnKey = `row-column-${key || columnIndex}`;

              if (!column || !columnsToDisplay.includes(columnIndex)) {
                return <Fragment key={rowKey + columnKey} />;
              }
              return (
                <TableCell key={rowKey + columnKey} className={classes.tableCell} {...cellProps}>
                  <CellTitle column={column} />
                  <CellBody row={row} column={column} />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {!hideEmptyRows && emptyRows > 0 && (
        <TableRow className={classes.tableCell} style={{ height: (tableProps.size === 'small' ? 33 : 53) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

LightTableBody.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.number,
  rowsPerPage: PropTypes.number,
  bodyClasses: PropTypes.string,
  rowClasses: PropTypes.string,
  bodyProps: PropTypes.object,
  rowProps: PropTypes.object,
  tableProps: PropTypes.object,
  rows: PropTypes.array,
  page: PropTypes.number,
  columns: PropTypes.array,
  columnsToDisplay: PropTypes.array,
  options: PropTypes.object,
  localization: PropTypes.object,
  filterActive: PropTypes.bool,
  setFilterActive: PropTypes.func,
  onRequestSort: PropTypes.func,
  tableToken: PropTypes.string,
  hideEmptyRows: PropTypes.bool,
};

export default LightTableBody;
