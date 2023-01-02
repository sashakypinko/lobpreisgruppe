import {
  TextField,
  Checkbox, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import isEqual from 'lodash-es/isEqual';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const CustomCheckboxAutocomplete = ({
  options,
  onChange,
  fieldName,
  name,
  value,
  label,
  textFieldProps,
  liProps,
  checkboxProps,
  multiple = true,
  ...rest
}) => {
  const [selectedValues, setSelectedValues] = useState(value);
  const handleChange = (e, newValue, ...other) => {
    if (!onChange) return;
    const newValueArray = newValue.map(nw => typeof nw === 'string' ? nw : nw.key);
    setSelectedValues(newValueArray);
    onChange({
      value: newValueArray,
      name: fieldName || name,
    }, ...other);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isEqual(selectedValues, value)) {
        setSelectedValues(value);
      }
    }, 100);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Autocomplete
      size="small"
      openOnFocus
      multiple={multiple}
      classes={{
        endAdornment: css({ top: 'calc(50% - 18px)' }),
      }}
      style={{
        marginTop: '16px',
      }}
      options={options}
      value={options.filter(option => selectedValues?.includes(option.key))}
      getOptionLabel={option => option.name}
      onChange={handleChange}
      ListboxComponent={List}
      renderOption={(props, {
        listItemProps,
        ...option
      }, { selected }) => {
        const {
          secondaryAction,
          ...restOfProps
        } = listItemProps || {};
        return (
          <ListItem {...props} {...liProps} {...restOfProps} key={option.key} classes={{ secondaryAction: 'test' }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
                {...checkboxProps}
              />
            </ListItemIcon>
            <ListItemText primary={option.name} sx={{ wordBreak: 'break-word' }}/>
          </ListItem>
        );
      }}
      renderInput={params => (
        <TextField
          variant="outlined"
          label={label}
          placeholder=""
          size="small"
          {...params}
          {...textFieldProps}
        />
      )}
      {...rest}
    />
  );
};

CustomCheckboxAutocomplete.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  fieldName: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  textFieldProps: PropTypes.object,
  liProps: PropTypes.object,
  checkboxProps: PropTypes.object,
  multiple: PropTypes.bool,
};

export default CustomCheckboxAutocomplete;
