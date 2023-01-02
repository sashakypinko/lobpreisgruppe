import { useCallback, useReducer } from 'react';

function itemReducer(state, newState) {
  const {
    name, value, values, resetValues,
  } = newState;
  if (resetValues) {
    return resetValues;
  }

  if (values) {
    return {
      ...state,
      ...values,
    };
  }
  return {
    ...state,
    [name]: value,
  };
}

const useValues = ({ defaultValues }) => {
  const [values, setValues] = useReducer(itemReducer, defaultValues);

  const handleChange = ({ name, value, values: newValues }) => {
    setValues({
      name,
      value,
      values: newValues,
    });
  };

  const resetValues = useCallback(() => {
    setValues({ resetValues: defaultValues });
  }, [defaultValues]);

  return {
    values,
    handleChange,
    resetValues,
  };
};

export default useValues;
