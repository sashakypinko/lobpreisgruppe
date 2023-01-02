import { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextArea } from 'vcc-ui';
import PropTypes from 'prop-types';

import CustomButton from '@/components/inputs/buttons/CustomButton';
import CustomTextField from '@/components/inputs/CustomTextField';

const TranslationDialog = ({
  open, onClose, defaultLanguage, selectedLanguage, data, handleSave,
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({});

  const [error, setError] = useState('');

  const validate = () => {
    const errors = [];

    if (!Object.keys(values).length) {
      errors.push(t('translations.keyIsRequired'));
    }

    const requiredValue = selectedLanguage ? 3 : 2;
    if (Object.keys(values).length < requiredValue) {
      errors.push(t('translations.valueIsRequired'));
    }

    Object.keys(values).forEach(key => {
      if (key === 'id') {
        if (values.id.trim() === '') {
          errors.push(t('translations.keyIsRequired'));
        } else if (data.some(item => item.id === values.id)) {
          errors.push(t('translations.keyAlreadyExists'));
        }
      } else if (values[key].trim() === '') {
        errors.push(t('translations.valueIsRequired'));
      }
    });

    const [errorToShow = ''] = errors;
    setError(errorToShow);
    return !errors.length;
  };

  const onChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  const onSave = () => {
    if (!validate()) {
      return;
    }
    handleSave(values);
    setValues({});
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="input-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="input-dialog">{t('translations.new')}</DialogTitle>
      <DialogContent>
        {error && (
        <FormHelperText
          error={!!error}
        >
          {t(error)}
        </FormHelperText>
        )}
        <CustomTextField
          name="id"
          label="translations.internalVariableName"
          aria-label={t('translations.internalVariableName')}
          value={values.id}
          onChange={onChange}
          autoFocus
        />
        <div style={{ marginTop: '16px' }}>
          <TextArea
            label={t('translations.translationsColumn', { language: t(`languageName.${defaultLanguage}`) })}
            value={values[defaultLanguage] ?? ''}
            onChange={event => onChange({ name: defaultLanguage, value: event.target.value })}
          />
        </div>
        {selectedLanguage && (
        <div style={{ marginTop: '16px' }}>
          <TextArea
            label={t('translations.translationsColumn', { language: t(`languageName.${selectedLanguage}`) })}
            value={values[selectedLanguage] ?? ''}
            onChange={event => onChange({ name: selectedLanguage, value: event.target.value })}
          />
        </div>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton variant="outline" onClick={onSave} intent="secondary">
          {t('save')}
        </CustomButton>
        <CustomButton onClick={onClose} color="primary">
          {t('cancel')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
export default TranslationDialog;

TranslationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
  selectedLanguage: PropTypes.string,
  data: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
};
