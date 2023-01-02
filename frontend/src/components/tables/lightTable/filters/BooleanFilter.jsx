import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { useDebounceChangeFilter } from '@/components/tables/hooks/tableHooks';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';
import useMobile from '@/components/layout/hooks/useMobile';

const BooleanFilter = ({
  column, columnIndex, filterValue, setFilterValue, tableToken,
}) => {
  const changeFilter = useDebounceChangeFilter(tableToken);
  const { isMobile } = useMobile();

  const onChange = ({ value }) => {
    setFilterValue(value);

    changeFilter(
      columnIndex,
      value,
    );
  };

  useEffect(() => {
    onChange({ value: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomCheckBox
      value={filterValue}
      label={column.filterTitle || (isMobile ? column.title : '')}
      onChange={onChange}
    />
  );
};

export default BooleanFilter;

BooleanFilter.propTypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  filterValue: PropTypes.bool,
  setFilterValue: PropTypes.func.isRequired,
  tableToken: PropTypes.string.isRequired,
};
