import {
  forwardRef, useState, useEffect, useImperativeHandle, useMemo,
} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  useTheme,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';

import TableStorageHelper from '@/components/tables/lightTable/tableHelpers/TableStorageHelper';
import useClasses from '@/components/layout/hooks/useClasses';
import {
  useElementSize,
  useSetTableFiltersByToken,
  useTableFiltersByToken,
} from '@/components/tables/hooks/tableHooks';
import LightTableTopScroll from '@/components/tables/lightTable/tableComponents/LightTableTopScroll';

import Loading from '../../loading/Loading';
import LightTableBody from './tableComponents/LightTableBody';
import LightTableHead from './tableComponents/LightTableHead';
import LightTablePagination from './tableComponents/LightTablePagination';
import LightTableToolbar from './tableComponents/LightTableToolbar';
import TableHelper from './tableHelpers/TableHelper';

const basicLocalization = {
  emptyDataSourceMessage: 'No Records',
  searchPlaceholder: 'Search',
  searchTooltip: 'Search',
  searchAriaLabel: 'Search',
  clearSearchAriaLabel: 'Clear Search',
  showColumnsTitle: 'Show Columns',
  showColumnsAriaLabel: 'Show Columns',
  exportCsvTitle: 'Export table as CSV',
  addRemoveColumns: 'Select Columns to display',
  filterPlaceHolder: '',
  filterTooltip: 'Filter',
};

const styles = {
  root: { position: 'relative', marginTop: 5 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const LightTable = forwardRef(({
  title = '',
  customTitle = '',
  customTools = '',
  columns = [],
  data = [],
  isLoading = false,
  tableKey,
  tableStorageKey,
  onPageChange = () => {},
  options = {},
  components = {},
  localization: customLocalization = {},
  classes = {},
  props: componentsProps = {},
  tableTheme = {},
  tableRef,
  setFilteredItems,
  hideEmptyRows,
  topScroll,
  exportFileName = '',
  withExport = false,
}, ref) => {
  const {
    pageSize = 10,
    pageSizeOptions = [10, 20, 50],
    customSearch,
    initPage = 0,
    filtering,
  } = options;

  const [{ width: tableWidth = 0 }, setTableRef] = useElementSize();

  let scrollEl;
  let tableContainerEl;
  const setScrollRef = scrollRef => (scrollEl = scrollRef);
  const setTableContainerRef = tableContainerRef => {
    tableContainerEl = tableContainerRef;
    setTableRef(tableContainerRef);
  };

  const tableContainerOnScroll = e => {
    scrollEl && (scrollEl.scrollLeft = e.target.scrollLeft);
  };
  const topScrollHandle = e => {
    tableContainerEl && (tableContainerEl.scrollLeft = e.target.scrollLeft);
  };

  const theme = useTheme();
  const styleClasses = useClasses(styles);

  const tableToken = useMemo(() => tableKey || uuid(), [tableKey]);

  const {
    OverlayLoading = Loading,
  } = components;

  const defaultLocalization = JSON.parse(JSON.stringify(basicLocalization));

  const localization = Object.assign(defaultLocalization, customLocalization);

  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(-1);
  const [orderActive, setOrderActive] = useState(false);
  const [page, setPage] = useState(initPage);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [columnsToDisplay, setColumnsToDisplay] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const filter = useTableFiltersByToken(tableToken);
  const setFilter = useSetTableFiltersByToken(tableToken);

  const activateFilter = isActive => {
    setFilterActive(isActive);
    if (!isActive) setFilter({});
  };

  useEffect(() => {
    orderActive && TableStorageHelper.setTableSorting(tableStorageKey, {
      orderBy,
      order,
    }).then();
  }, [orderBy, order, orderActive, tableStorageKey]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const tableSorting = await TableStorageHelper.getTableSorting(tableStorageKey);
      if (tableSorting && mounted) {
        const { orderBy: newOrderBy, order: newOrder } = tableSorting;
        setOrder(newOrder);
        setOrderBy(newOrderBy);
      }

      tableStorageKey && setOrderActive(true);
    })();
    return () => {
      mounted = false;
    };
  }, [tableStorageKey]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (tableStorageKey) {
        let columnIndexes = await TableStorageHelper.getTableColumnIndexes(tableStorageKey);
        if (!columnIndexes) {
          columnIndexes = [];
          columns.forEach((col, index) => {
            if (!col.hidden) {
              columnIndexes.push(index);
            }
          });
        }
        mounted && setColumnsToDisplay(columnIndexes);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableStorageKey]);

  const onColumnsChanged = (col, index, checked) => {
    const newColumnIndexes = checked ? columnsToDisplay.filter(el => el !== index) : [...columnsToDisplay, index];
    setColumnsToDisplay(newColumnIndexes);
    tableStorageKey && TableStorageHelper.setTableColumnIndexes(tableStorageKey, newColumnIndexes).then();
  };

  const {
    root: rootProps = {},
    head: headProps = {},
    table: tableProps = {},
    body: bodyProps = {},
    row: rowProps = {},
    headRow: headRowProps = {},
    headCell: headCellProps = {},
    pagination: paginationProps = {},
  } = componentsProps;

  const {
    root: rootClasses = '',
    head: headClasses = '',
    table: tableClasses = '',
    body: bodyClasses = '',
    row: rowClasses = '',
    pagination: paginationClasses = '',
    headRow: headRowClasses = '',
    headCell: headCellClasses = '',
  } = classes;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dataManager = {
    changeCurrentPage: newPage => handleChangePage(null, newPage),
    onColumnsChanged,
  };

  useImperativeHandle(
    tableRef,
    () => ({
      dataManager,
      tableToken,
    }),
  );

  const rows = useMemo(() => TableHelper.filterRows(data, {
    columns,
    searchText,
    customSearch,
    filter,
  }), [columns, customSearch, data, filter, searchText]);

  const rowsLength = rows.length;

  const [{ width: bodyWidth = 0 }, setBodyRef] = useElementSize([rowsLength, columnsToDisplay]);

  useEffect(() => {
    setFilteredItems && setFilteredItems(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, data, setFilteredItems]);

  useEffect(() => {
    setPage(0);
  }, [rowsLength]);

  const tableThemeString = JSON.stringify(tableTheme || {});

  const newTheme = useMemo(
    () => ({ ...theme, tableTheme: TableHelper.prepareTableTheme(tableTheme, theme) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableThemeString, theme],
  );

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={newTheme}>
        <ThemeProvider theme={newTheme}>
          <Paper className={cx(rootClasses, styleClasses.root)} elevation={3} {...rootProps} ref={ref}>
            {isLoading && (
              <div
                className={styleClasses.overlay}
              >
                <OverlayLoading />
              </div>
            )}
            <LightTableToolbar
              title={title}
              customTitle={customTitle}
              customTools={customTools}
              localization={localization}
              searchText={searchText}
              setSearchText={setSearchText}
              columns={columns}
              rows={rows}
              onColumnsChanged={onColumnsChanged}
              columnsToDisplay={columnsToDisplay}
              columnsButton
              exportFileName={exportFileName}
              withExport={withExport}
              tableKey={tableKey}
              filtering={filtering}
              filterActive={filterActive}
              setFilterActive={activateFilter}
            />
            { topScroll && rowsLength > 0 && bodyWidth > tableWidth && (
            <LightTableTopScroll
              setScrollRef={setScrollRef}
              topScrollHandle={topScrollHandle}
              bodyWidth={bodyWidth}
            />
            )}
            <TableContainer ref={setTableContainerRef} onScroll={tableContainerOnScroll}>
              <Table
                className={tableClasses}
                aria-labelledby="tableTitle"
                aria-label="light table"
                {...tableProps}
                size="small"
              >
                <LightTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headClasses={headClasses}
                  headCellClasses={headCellClasses}
                  headRowClasses={headRowClasses}
                  headProps={headProps}
                  headRowProps={headRowProps}
                  headCellProps={headCellProps}
                  columns={columns}
                  columnsToDisplay={columnsToDisplay}
                />
                <LightTableBody
                  bodyClasses={bodyClasses}
                  rowClasses={rowClasses}
                  bodyProps={{
                    ref: setBodyRef,
                    ...bodyProps,
                  }}
                  rowProps={rowProps}
                  tableProps={tableProps}
                  rowsPerPage={rowsPerPage}
                  order={order}
                  orderBy={orderBy}
                  rows={rows}
                  columns={columns}
                  page={page}
                  columnsToDisplay={columnsToDisplay}
                  options={options}
                  localization={localization}
                  filterActive={filterActive}
                  setFilterActive={activateFilter}
                  onRequestSort={handleRequestSort}
                  tableToken={tableToken}
                  hideEmptyRows={hideEmptyRows}
                />
              </Table>
            </TableContainer>
            <LightTablePagination
              rowsPerPageOptions={pageSizeOptions}
              count={rowsLength}
              rowsPerPage={rowsPerPage}
              page={page > Math.ceil(rowsLength / rowsPerPage) - 1 ? 0 : page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className={paginationClasses}
              options={options}
              {...paginationProps}
            />
          </Paper>
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
});

LightTable.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  customTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  customTools: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  tableKey: PropTypes.string,
  options: PropTypes.object,
  components: PropTypes.object,
  localization: PropTypes.object,
  classes: PropTypes.object,
  props: PropTypes.shape({
    root: PropTypes.object,
    head: PropTypes.object,
    table: PropTypes.object,
    body: PropTypes.object,
    row: PropTypes.object,
    headRow: PropTypes.object,
    headCell: PropTypes.object,
    pagination: PropTypes.object,
  }),
  tableTheme: PropTypes.object,
  tableRef: PropTypes.any,
  hideEmptyRows: PropTypes.bool,
  topScroll: PropTypes.bool,
  setFilteredItems: PropTypes.func,
  tableStorageKey: PropTypes.string,
  exportFileName: PropTypes.string,
  withExport: PropTypes.bool,
};

export default LightTable;
