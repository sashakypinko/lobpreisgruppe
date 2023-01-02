import DatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { de, uk, ru } from 'date-fns/locale';

import useClasses from '@/components/layout/hooks/useClasses';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('de', de);
registerLocale('ua', uk);
registerLocale('ru', ru);

const styles = {
  datePicker: {
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    border: '1px solid #c4c4c4',
    borderRadius: '4px',
    boxSizing: 'content-box',
    background: 'none',
    height: '20px',
    display: 'block',
    minWidth: 0,
    padding: '8.5px 14px',
    marginTop: '16px',
    width: '-webkit-fill-available',
  },
};

const CustomDatePicker = ({
  value,
  placeholder,
  onChange,
  ...rest
}) => {
  const { i18n } = useTranslation();
  const classes = useClasses(styles);

  const handleChange = date => {
    onChange(date);
  };

  return (
    <DatePicker
      selected={value}
      className={classes.datePicker}
      placeholderText={placeholder}
      locale={i18n.language}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
