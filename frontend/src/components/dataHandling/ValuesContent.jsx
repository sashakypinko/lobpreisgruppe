import get from 'lodash-es/get';
import {
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';

import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextField from '@/components/inputs/CustomTextField';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';

import CustomCodeBlock from './CustomCodeBlock';

const getComponentByType = type => {
  switch (type) {
    case 'text':
      return CustomTextField;
    case 'select':
      return CustomSelect;
    case 'checkbox':
      return CustomCheckBox;
    case 'code':
      return CustomCodeBlock;
    default:
      return CustomTextField;
  }
};

const ValuesContent = ({
  inputs = [],
  onChange,
  values,
  isError,
}) => (
  <Grid container>
    {inputs.map((inputData, index) => {
      const {
        inputType, props, gridProps = { xs: 12 },
      } = inputData;
      // eslint-disable-next-line react/prop-types
      const { name } = props;

      const value = get(values, name, '');

      const InputComponent = getComponentByType(inputType);

      return (
        <Grid item {...gridProps} key={`values_dialog_input_${index}`}>
          <InputComponent
            fullWidth
            onChange={onChange}
            {...props}
            value={value}
            error={isError ? isError(name) : ''}
          />
        </Grid>
      );
    })}
  </Grid>
);

export default ValuesContent;

ValuesContent.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.shape({
    inputType: PropTypes.string,
    props: PropTypes.any,
    gridProps: PropTypes.any,
  })).isRequired,
  isError: PropTypes.bool,
  onChange: PropTypes.func,
  values: PropTypes.any,
};
