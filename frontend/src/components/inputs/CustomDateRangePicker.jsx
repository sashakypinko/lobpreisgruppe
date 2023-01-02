import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = () => ({
  dateRangePicker: {
    marginTop: 5,
    width: '100%',
    fontSize: 14,
    justifyContent: 'center',
    display: 'block !important',
    '& .react-daterange-picker__wrapper': {
      borderRadius: 4,
      padding: 6,
      borderColor: '#C4C4C4',
      height: 'var(--theme-spacing-5)',
      flexGrow: 0,
    },
    '& .react-daterange-picker__button': {
      padding: '0px 6px',
    },
  },
});

const CustomDateRangePicker = (
  {
    value,
    minDate,
    maxDate,
    format,
    disabled,
    onChange,
  },
) => {
  const { i18n } = useTranslation();
  const classes = useClasses(styles);

  const handleChange = dateRange => {
    onChange(dateRange);
  };

  return (
    <DateRangePicker
      onChange={handleChange}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      format={format}
      className={classes.dateRangePicker}
      locale={i18n.language}
      disabled={disabled}
    />
  );
};

export default CustomDateRangePicker;

CustomDateRangePicker.defaultProps = {
  format: 'dd.MM.yyyy',
  value: new Date(),
  disabled: false,
  onChange: () => {
  },
};

CustomDateRangePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
