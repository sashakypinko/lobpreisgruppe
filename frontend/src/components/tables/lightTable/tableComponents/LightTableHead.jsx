import { Fragment } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Hide from '@/components/layout/Hide';

const LightTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headClasses,
  headRowClasses,
  headCellClasses,
  headProps,
  headRowProps,
  headCellProps,
  columns,
  columnsToDisplay,
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const theme = useTheme();
  const { tableTheme } = theme;
  const { hiddenDown } = tableTheme;

  return (
    <Hide {...hiddenDown}>
      <TableHead className={headClasses} {...headProps}>
        <TableRow className={headRowClasses} {...headRowProps}>
          {columns.map((headCell, index) => {
            const {
              title = '',
              key = '',
              field = '',
              headCellProps: fieldCellProps = {},
              sorting = true,
              tableSortLabelProps = {},
            } = headCell || {};

            const cellKey = key || field + index;

            if (!columnsToDisplay.includes(index)) {
              return <Fragment key={cellKey} />;
            }

            return (
              <TableCell
                key={cellKey}
                sortDirection={orderBy === index && sorting ? order : false}
                className={headCellClasses}
                {...headCellProps}
                {...fieldCellProps}
              >
                <TableSortLabel
                  active={orderBy === index}
                  direction={orderBy === index ? order : 'asc'}
                  onClick={createSortHandler(index)}
                  {...tableSortLabelProps}
                >
                  {title}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    </Hide>
  );
};

LightTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.number,
  onRequestSort: PropTypes.func,
  headClasses: PropTypes.string,
  headRowClasses: PropTypes.string,
  headCellClasses: PropTypes.string,
  headProps: PropTypes.object,
  headRowProps: PropTypes.object,
  headCellProps: PropTypes.object,
  columns: PropTypes.array,
  columnsToDisplay: PropTypes.array,
};

export default LightTableHead;
