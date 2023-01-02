import LocalStorage from '@/components/storage/Storage';

const tableStoragePrefix = 'table-';

const TableStorageHelper = {
  getTableColumnIndexes: async tableStorageKey => {
    if (!tableStorageKey) return null;
    const tableData = await LocalStorage.get(`${tableStoragePrefix}${tableStorageKey}`) || {};
    const { columnIndexes } = tableData;
    return columnIndexes;
  },
  setTableColumnIndexes: async (tableStorageKey, columnIndexes) => {
    if (!tableStorageKey) return null;
    const tableData = await LocalStorage.get(`${tableStoragePrefix}${tableStorageKey}`) || {};
    return LocalStorage.save(
      `${tableStoragePrefix}${tableStorageKey}`,
      {
        ...tableData,
        columnIndexes,
      },
    );
  },
  getTableSorting: async tableStorageKey => {
    if (!tableStorageKey) return null;
    return LocalStorage.get(`${tableStoragePrefix}${tableStorageKey}-sorting`);
  },
  setTableSorting: async (tableStorageKey, tableSortingData) => {
    if (!tableStorageKey || !tableSortingData) return null;
    return LocalStorage.save(`${tableStoragePrefix}${tableStorageKey}-sorting`, tableSortingData);
  },
};

export default TableStorageHelper;
