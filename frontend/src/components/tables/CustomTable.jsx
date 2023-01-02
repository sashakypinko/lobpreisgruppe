import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import tablePagingStore from './stores/tablePagingStore';
import LightTable from './lightTable';

const CustomTable = ({
  title,
  customTitle,
  customTools,
  columns,
  data,
  options = {},
  isLoading,
  OverlayLoading,
  pagingKey,
  hideEmptyRows,
  topScroll,
  ...rest
}) => {
  const { t } = useTranslation();

  const {
    size = 'normal',
    dense = 'dense',
    ...restOptions
  } = options;
  const cellStyle = (size === 'small') ? {
    padding: '0 10px',
  } : {};

  return (
    <LightTable
      data={data}
      columns={columns}
      title={<Typography variant="h2">{title}</Typography>}
      customTitle={customTitle}
      customTools={customTools}
      options={{
        cellStyle,
        padding: dense,
        pageSize: 25,
        pageSizeOptions: [25, 50, 75, 100],
        columnsButton: true,
        ...restOptions,
      }}
      components={{
        OverlayLoading: () => OverlayLoading,
      }}
      localization={{
        emptyDataSourceMessage: isLoading ? '' : t('noRecords'),
        searchPlaceholder: t('search'),
        searchTooltip: t('search'),
        searchAriaLabel: t('search'),
        clearSearchAriaLabel: t('clearSearch'),
        showColumnsTitle: t('showColumns'),
        showColumnsAriaLabel: t('showColumns'),
        addRemoveColumns: t('addRemoveColumns'),
        filterTooltip: t('filter'),
      }}
      isLoading={isLoading}
      onPageChange={async page => {
        if (pagingKey && !isLoading) {
          tablePagingStore.update(pagingKey, page);
        }
      }}
      tableTheme={{
        mobileBreakpoint: 'md',
      }}
      hideEmptyRows={hideEmptyRows}
      topScroll={topScroll}
      {...rest}
    />
  );
};

CustomTable.propTypes = {
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
  options: PropTypes.object,
  isLoading: PropTypes.bool,
  OverlayLoading: PropTypes.object,
  pagingKey: PropTypes.string,
  hideEmptyRows: PropTypes.bool,
  topScroll: PropTypes.bool,
};

export default CustomTable;
