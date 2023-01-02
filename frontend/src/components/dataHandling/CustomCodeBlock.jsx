import {
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const stylesToUse = {
  pre: {
    display: 'block',
    padding: '9.5px',
    margin: '0 0 10px',
    fontSize: '13px',
    lineHeight: 1.42857143,
    color: '#333',
    wordBreak: 'break-all',
    backgroundColor: '#f8f8f8',
    border: '1px solid #ccc',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
  },
};

const CustomCodeBlock = (
  {
    text,
    code,
  },
) => {
  const { t } = useTranslation();

  const classes = useClasses(stylesToUse);
  return (
    <>
      <br />
      <Typography variant="body1">{t(text)}</Typography>
      <pre className={classes.pre}>
        <code>{code}</code>
      </pre>
    </>
  );
};

export default CustomCodeBlock;

CustomCodeBlock.propTypes = {
  text: PropTypes.string,
  code: PropTypes.string,
};
