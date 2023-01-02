import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

import BasicConfig from '../config/BasicConfig';
import UrlHelper from '../connections/UrlHelper';
import CustomSelect from '../inputs/CustomSelect';

const { perPageValues } = BasicConfig;

const styles = {
  selectPerPage: {
    verticalAlign: 'top',
  },
};

const setPerPage = value => {
  UrlHelper.setParams([{
    name: 'perPage',
    value: value,
  },
  {
    name: 'page',
    value: 1,
  }]);
};

const PerPagePicker = ({ fullWidth = false }) => {
  const classes = useClasses(styles);

  useLocation();

  const perPage = UrlHelper.getParam('perPage', perPageValues[0]);

  return (
    <CustomSelect
      className={classes.selectPerPage}
      fullWidth={fullWidth}
      name="perPage"
      value={perPage}
      onChange={({ value }) => {
        setTimeout(() => {
          setPerPage(value);
        }, 0);
      }}
      options={
        perPageValues.map(val => ({
          value: val,
          text: val,
        }))
      }
    />
  );
};

export default PerPagePicker;

PerPagePicker.propTypes = {
  fullWidth: PropTypes.bool,
};
