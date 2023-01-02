function descendingComparator(a, b, orderField) {
  if (!a || !b) return 0;

  const orderFieldA = a[orderField] || '';
  const orderFieldB = b[orderField] || '';

  if (orderFieldB < orderFieldA) {
    return -1;
  }
  if (orderFieldB > orderFieldA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderField, orderBy, comparator = descendingComparator) {
  return order === 'desc'
    ? (a, b) => comparator(a, b, orderField, orderBy)
    : (a, b) => -comparator(a, b, orderField, orderBy);
}

function stableSort(array = [], comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const TableHelper = {
  prepareTableTheme: (tableTheme, theme) => {
    const { mobileBreakpoint = 'sm' } = tableTheme;
    const mobileUpIndex = theme.breakpoints.keys.indexOf(mobileBreakpoint);
    const mobileUpBreakpoint = theme.breakpoints.keys[mobileUpIndex] || 'md';
    return {
      mobileBreakpoint,
      mobileUpBreakpoint,
      hiddenDown: {
        [`${mobileBreakpoint}Down`]: true,
      },
      hiddenUp: {
        [`${mobileUpBreakpoint}Up`]: true,
      },
    };
  },

  searchInRows: (data, searchText = '', columns) => (searchText ? data.filter(row => {
    let elementFound = false;
    columns.forEach(col => {
      if (row && col.field) {
        if (
          typeof row[col.field] === 'string'
          && row[col.field].toLowerCase().includes(searchText.toLowerCase())
        ) {
          elementFound = true;
        }
      }
    });
    return elementFound;
  }) : data),

  getByFilters: (data, filter = {}, columns) => data.filter(row => {
    let rowFound = true;

    columns.forEach((col, colIndex) => {
      if (col.filter !== false) {
        if (Object.prototype.hasOwnProperty.call(filter, colIndex)) {
          if (col.customFilter) {
            const filterResult = col.customFilter(filter[colIndex], row);
            rowFound = rowFound ? filterResult : rowFound;
          } else if (row && col.field) {
            if (typeof filter[colIndex] === 'string' && typeof row[col.field] === 'string') {
              if (!filter[colIndex]) return rowFound;
              const filterResult = row[col.field].toLowerCase()
                .includes(filter[colIndex].toLowerCase());
              rowFound = rowFound ? filterResult : rowFound;
            } else if (typeof row[col.field] === 'number') {
              const filterNumber = Number(filter[colIndex]);
              if (!filterNumber) return rowFound;
              const filterResult = filterNumber === row[col.field];
              rowFound = rowFound ? filterResult : rowFound;
            } else if (Array.isArray(filter[colIndex])) {
              const filterResult = !filter[colIndex].length || filter[colIndex].includes(row[col.field]);
              rowFound = rowFound ? filterResult : rowFound;
            } else {
              const filterResult = row[col.field] === filter[colIndex];
              rowFound = rowFound ? filterResult : rowFound;
            }
          }
        }
      }
    });

    return rowFound;
  }),

  filterRows: (data, filterMeta) => {
    const {
      searchText, columns, customSearch, filter,
    } = filterMeta;
    let filteredData;
    if (customSearch) {
      filteredData = customSearch(data, searchText, columns);
    } else {
      filteredData = TableHelper.searchInRows(data, searchText, columns);
    }
    filteredData = TableHelper.getByFilters(filteredData, filter, columns);

    return filteredData;
  },

  prepareRows: (data, sortMeta, page, rowsPerPage) => TableHelper.sortRows(data, sortMeta)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),

  sortRows: (data, {
    columns,
    order,
    orderBy,
  }) => {
    if (orderBy < 0) {
      return data;
    }
    const columnToOrder = columns[orderBy];

    if (!columnToOrder || !columnToOrder.field) return data;

    const { customSort } = columnToOrder;

    return stableSort(data, getComparator(order, columnToOrder.field, orderBy, customSort));
  },
};

export default TableHelper;
