import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useDebounceChangeFilter, useLatestFilter, useSetLatestFilter } from '@/components/tables/hooks/tableHooks';
import CustomCheckboxAutocomplete from '@/components/inputs/CustomCheckboxAutocomplete';

const LookupFilter = ({
  column, columnIndex, localization, tableToken, componentProps,
}) => {
  const [selectedFilterValues, setSelectedFilterValues] = useState(
    [],
  );

  const changeFilter = useDebounceChangeFilter(tableToken);
  const lastFilterIndex = useLatestFilter();
  const setLatestFilter = useSetLatestFilter();

  const onChange = ({ value }, resetLastFilter = false) => {
    setSelectedFilterValues(value);
    changeFilter(
      columnIndex,
      value,
    );

    setLatestFilter(resetLastFilter ? -1 : columnIndex);
  };

  useEffect(() => {
    onChange({
      value: [],
    }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preparedOptions = useMemo(() => Object.entries(
    lastFilterIndex === columnIndex && column.lookup
      ? column.lookup
      : column.originalLookup,
  ).map(([key, name]) => ({
    key,
    name,
  })), [
    column.lookup,
    column.originalLookup,
    columnIndex,
    lastFilterIndex,
  ]);

  return (
    <CustomCheckboxAutocomplete
      autoFocus
      options={preparedOptions}
      value={selectedFilterValues}
      label={localization.filterPlaceholder || column.title}
      openOnFocus
      onChange={onChange}
      size="small"
      {...componentProps}
    />
  );
};

export default LookupFilter;

LookupFilter.propTypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  localization: PropTypes.object.isRequired,
  tableToken: PropTypes.string.isRequired,
  componentProps: PropTypes.object,
};
