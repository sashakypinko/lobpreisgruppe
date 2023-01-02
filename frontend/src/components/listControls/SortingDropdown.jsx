import { IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useSortParams from '@/components/filterSorting/hooks/useSortParams';
import { SortByValues, SortDirectionValues } from '@/screens/products/enums/ProductEnums';
import Storage from '@/components/storage/Storage';

import UrlHelper from '../connections/UrlHelper';
import CustomSelect from '../inputs/CustomSelect';

const sortByValues = Object.values(SortByValues);

const setSortBy = value => {
  UrlHelper.setParams([{
    name: 'sortBy',
    value: value,
  },
  {
    name: 'sortDirection',
    value: SortDirectionValues.ASC,
  },
  {
    name: 'page',
    value: 1,
  }]);
  Storage.save('sortBy', value).then();
  Storage.save('sortDirection', SortDirectionValues.ASC).then();
};

const setSortDirection = value => {
  UrlHelper.setParams([{
    name: 'sortDirection',
    value: value,
  },
  {
    name: 'page',
    value: 1,
  }]);
  Storage.save('sortDirection', value).then();
};

const SortingDropdown = ({ fullWidth = false }) => {
  const { sortBy, sortDirection } = useSortParams();
  const { t } = useTranslation();

  return (
    <>
      <CustomSelect
        fullWidth={fullWidth}
        name="sortBy"
        value={sortBy}
        label={t('sorting')}
        onChange={({ value }) => {
          setTimeout(() => {
            setSortBy(value);
          }, 0);
        }}
        options={
          sortByValues.map(val => ({
            value: val,
            text: val,
          }))
        }
        sx={{ verticalAlign: 'top', ml: 1 }}
      />
      {sortBy !== SortByValues.VOLVO_RECOMMENDED && (
        <IconButton
          onClick={() => setSortDirection(
            sortDirection === SortDirectionValues.ASC ? SortDirectionValues.DESC : SortDirectionValues.ASC,
          )}
          size="small"
        >
          {
            sortDirection === SortDirectionValues.ASC
              ? <ArrowUpward fontSize="small" />
              : <ArrowDownward fontSize="small" />
          }
        </IconButton>
      )}
    </>
  );
};

export default SortingDropdown;

SortingDropdown.propTypes = {
  fullWidth: PropTypes.bool,
};
