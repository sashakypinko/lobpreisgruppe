import { useEffect, useState } from 'react';
import { TextareaAutosize, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  textarea: {
    padding: '7px',
    fontSize: '11px',
    height: '100%',
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  editText: {
    fontSize: '11px',
    color: '#a1a1a1',
    backgroundColor: '#eeeeee',
    border: '1px solid #d6d6d6',
    borderRadius: '4px',
    padding: '2px 10px',
  },
};

const EditableCell = ({ row, renderProps }) => {
  const { t } = useTranslation();
  const { rowLanguageField, onChange } = renderProps;
  const { [rowLanguageField]: value, id } = row;

  const [val, setVal] = useState('');

  useEffect(() => {
    setVal(value);
  }, [value]);

  const [editionMode, setEditionMode] = useState(false);
  const classes = useClasses(styles);

  if (!rowLanguageField) return null;

  const onClick = () => {
    setEditionMode(true);
  };

  const onBlur = () => {
    onChange(id, val, rowLanguageField);
    setEditionMode(false);
  };

  if (editionMode) {
    return (
      <TextareaAutosize
        value={val}
        className={classes.textarea}
        onChange={e => setVal(e.target.value)}
        onBlur={onBlur}
        onKeyPress={e => { if (e.key === 'Enter') onBlur(); }}
        autoFocus
      />
    );
  }

  return (
    <button onClick={onClick} className={classes.button} type="button">
      <Typography>{value || <span className={classes.editText}>{t('translations.edit')}</span>}</Typography>
    </button>
  );
};

export default EditableCell;

EditableCell.propTypes = {
  row: PropTypes.object.isRequired,
  renderProps: PropTypes.object.isRequired,
};
