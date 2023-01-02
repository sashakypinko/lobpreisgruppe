import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AddCircle } from '@mui/icons-material';

import CustomSelect from '@/components/inputs/CustomSelect';
import useClasses from '@/components/layout/hooks/useClasses';
import useConfirm from '@/components/dialogs/hooks/useConfirm';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';

import useLanguages from './useLanguages';
import useTranslations from './useTranslations';
import TranslationDialog from './TranslationDialog';
import TranslationsTable from './TranslationsTable';

const styles = {
  formControl: {
    minWidth: 120,
  },
  topControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
};

const AdminTranslations = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { createErrorSnackbar, createSuccessSnackbar } = useSnackbar();

  const {
    isLoading: isLoadingLanguages, defaultLanguage, additionalLanguages, isError: isErrorLanguages,
  } = useLanguages();
  const {
    rows, isError, hasChanged, loading,
    onChange, onDelete, onSave, onCreate,
  } = useTranslations(defaultLanguage, selectedLanguage);

  const { ConfirmDialog, openDialog } = useConfirm();
  const [modal, setModal] = useState(false);

  if (isErrorLanguages || isError) {
    openDialog(t('translations.errorWhileFetching'));
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const onAddNew = values => {
    onCreate(values);
    toggleModal();
  };

  const onConfirm = key => {
    openDialog(t('translations.sureToDeleteItem', { key }), () => onDelete(key)).then();
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
  };

  const onConfirmChangeLanguage = language => {
    if (hasChanged) {
      openDialog(
        t('translations.sureToChangeLanguage', { language: t(`languageName.${language}`) }),
        () => handleLanguageChange(language),
      ).then();
    } else {
      setSelectedLanguage(language);
    }
  };

  const handleSave = async () => {
    const isOk = await onSave(openDialog);

    if (isOk) {
      createSuccessSnackbar(t('translations.savedSuccessfully'));
    } else {
      createErrorSnackbar(t('translations.errorUpdating'));
    }
  };

  return (
    <>
      <div className={classes.topControls}>
        <div style={{ display: 'flex' }}>
          {additionalLanguages.length ? (
            <CustomSelect
              name="language"
              label={t('translations.selectLanguage')}
              value={selectedLanguage}
              onChange={({ value }) => onConfirmChangeLanguage(value)}
              disabled={isLoadingLanguages}
              style={{ minWidth: 200 }}
              options={
                additionalLanguages.map(val => ({
                  value: val,
                  text: t(`languageName.${val}`),
                }))
            }
            />
          ) : null}
          {(isLoadingLanguages || loading) && (
            <CircularProgress style={{ marginLeft: 20 }} />
          )}
        </div>
        <div>
          <Button onClick={toggleModal} style={{ marginRight: '20px' }}>
            <AddCircle />
          </Button>
          <Button onClick={handleSave} disabled={!hasChanged || loading} variant="contained" color="primary">
            {t('translations.save')}
          </Button>
        </div>
      </div>

      <TranslationsTable
        data={rows}
        defaultLanguage={defaultLanguage}
        selectedLanguage={selectedLanguage}
        onChange={onChange}
        onConfirm={onConfirm}
      />

      <TranslationDialog
        open={modal}
        onClose={toggleModal}
        defaultLanguage={defaultLanguage}
        selectedLanguage={selectedLanguage}
        handleSave={onAddNew}
        data={rows}
        onChange={onChange}
      />
      {ConfirmDialog}

    </>
  );
};

export default AdminTranslations;
