import { useEffect, useRef } from 'react';

import tablePagingStore from '@/components/tables/stores/tablePagingStore';

const useTableProps = ({ pagingKey, finished, updateAction }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (finished) {
      if (tableRef.current && tableRef.current.dataManager) {
        tableRef.current.dataManager.changeCurrentPage(tablePagingStore.get(pagingKey));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const updateTable = async () => {
    tablePagingStore.update(pagingKey, 0);
    if (tableRef.current && tableRef.current.dataManager) {
      tableRef.current.dataManager.changeCurrentPage(0);
    }
    await updateAction();
  };

  return {
    tableRef,
    updateTable,
  };
};

export default useTableProps;
