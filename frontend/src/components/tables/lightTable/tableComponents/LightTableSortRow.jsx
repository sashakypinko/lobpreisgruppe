import {
  Grid, IconButton, TableCell, TableRow, Select,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import Hide from '@/components/layout/Hide';

const styles = {
  formControl: {
    width: '100%',
  },
  item: { flexGrow: 1 },
};

const LightTableSortRow = ({
  order,
  orderBy,
  columns,
  onRequestSort,
  columnsToDisplay,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  const theme = useTheme();
  const { tableTheme } = theme;
  const { hiddenUp } = tableTheme;

  const handleFocusExisted = () => {
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  return (
    <Hide {...hiddenUp}>
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.closeFilter}>
          <Grid container>
            <Grid item className={classes.item}>
              <FormControl color="secondary" className={classes.formControl}>
                <InputLabel>{t('sortBy')}</InputLabel>
                <Select
                  variant="outlined"
                  value={orderBy}
                  onChange={e => {
                    onRequestSort(e, e.target.value);
                  }}
                  name="sort-by"
                  fullWidth
                  MenuProps={{
                    TransitionProps: {
                      onExited: handleFocusExisted,
                    },
                  }}
                >
                  <MenuItem value={-1}>
                    {t('noSorting')}
                  </MenuItem>
                  {
                    columns
                      .filter((c, i) => columnsToDisplay.includes(i))
                      .filter(({ sorting = true }) => sorting)
                      .map(
                        (column = {}, index) => (
                          <MenuItem
                            key={`mobile_table_sort_option_${column.key || index}`}
                            value={index}
                          >
                            {column.title}
                          </MenuItem>
                        ),
                      )
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton
                disabled={orderBy === -1}
                onClick={() => onRequestSort(null, orderBy)}
                size="large"
              >
                {order === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
              </IconButton>
            </Grid>
          </Grid>

        </TableCell>
      </TableRow>
    </Hide>
  );
};

LightTableSortRow.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.number,
  columns: PropTypes.array,
  onRequestSort: PropTypes.func,
  columnsToDisplay: PropTypes.array,
};

export default LightTableSortRow;
