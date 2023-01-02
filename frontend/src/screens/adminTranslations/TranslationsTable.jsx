import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import LoadingTable from '@/components/loading/LoadingTable';
import CustomTable from '@/components/tables/CustomTable';

import EditableCell from './EditableCell';
import RemoveItem from './RemoveItem';

const TranslationsTable = ({
  data, defaultLanguage, selectedLanguage, onChange, onConfirm,
}) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      field: 'id',
      key: 'id',
      title: t('translations.internalVariableName'),
      cellProps: {
        sx: { width: '30%' },
      },
    },
    {
      field: defaultLanguage,
      key: defaultLanguage,
      title: t('translations.translationsColumn', { language: t(`languageName.${defaultLanguage}`) }),
      cellProps: {
        sx: { width: selectedLanguage ? '30%' : '60%' },
      },
      render: EditableCell,
      renderProps: { rowLanguageField: defaultLanguage, onChange },
    },
    {
      field: selectedLanguage,
      key: selectedLanguage,
      title: selectedLanguage
        ? t('translations.translationsColumn', { language: t(`languageName.${selectedLanguage}`) })
        : '',
      cellProps: {
        sx: { width: selectedLanguage ? '30%' : '0' },
      },
      render: EditableCell,
      renderProps: { rowLanguageField: selectedLanguage, onChange },
    },
    {
      field: 'action',
      title: '',
      cellProps: {
        sx: { width: '10%' },
      },
      render: RemoveItem,
      renderProps: { onConfirm },
    },
  ], [defaultLanguage, onChange, onConfirm, selectedLanguage, t]);

  return (
    <CustomTable
      isLoading={false}
      tableKey="TRANSLATIONS"
      title={<Typography variant="h1" component="div">{t('translations.title')}</Typography>}
      OverlayLoading={<LoadingTable />}
      pagingKey="TRANSLATIONS"
      tableStorageKey="TRANSLATIONS"
      columns={columns}
      data={data}
    />
  );
};

export default TranslationsTable;

TranslationsTable.propTypes = {
  data: PropTypes.array.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
  selectedLanguage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
