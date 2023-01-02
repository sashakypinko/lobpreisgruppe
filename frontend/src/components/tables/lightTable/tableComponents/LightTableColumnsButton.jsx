import { useRef, useState } from 'react';
import {
  IconButton, Menu, Tooltip, MenuItem, Checkbox,
} from '@mui/material';
import { ViewColumn } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  columnChooserHeader: {
    opacity: 1,
    fontWeight: 600,
    fontSize: 12,
    padding: 'var(--theme-spacing-2)',
    margin: 'var(--theme-spacing-1)',
    borderBottom: '1px solid',
    borderBottomColor: '--theme-palette-secondary-main',
  },
  columnChooserItem: {
    paddingLeft: 'var(--theme-spacing-2)',
    paddingRight: 'var(--theme-spacing-2)',
  },
  maxItemHeight: { maxHeight: 'var(--theme-spacing-4)' },
};

const LightTableColumnsButton = ({
  localization,
  columns,
  onColumnsChanged,
  columnsToDisplay,
}) => {
  const buttonEl = useRef(null);
  const [open, setOpen] = useState(false);

  const classes = useClasses(styles);

  return (
    <span>
      <Tooltip title={localization.showColumnsTitle}>
        <IconButton
          color="inherit"
          aria-label={localization.showColumnsAriaLabel}
          ref={buttonEl}
          onClick={() => setOpen(true)}
          size="large"
        >
          <ViewColumn />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={buttonEl.current}
        open={open}
        onClose={() => setOpen(false)}
      >
        <MenuItem
          key="text"
          disabled
          className={classes.columnChooserHeader}
        > <Typography variant="h2" component="div">{localization.addRemoveColumns}</Typography>
        </MenuItem>
        {columns.map((col, index) => {
          if (!col.alwaysVisible && (!col.hidden || col.hiddenByColumnsButton || columnsToDisplay.includes(index))) {
            const columnKey = col.key || `show-columns-${index}`;
            const checked = columnsToDisplay.includes(index);
            return (
              <li key={columnKey}>
                <MenuItem
                  className={classes.columnChooserItem}
                  component="label"
                  htmlFor={columnKey}
                  disabled={col.removable === false}
                  onClick={() => onColumnsChanged(col, index, checked)}
                >
                  <Checkbox
                    checked={checked}
                    id={`column-toggle-${columnKey}`}
                    className={classes.maxItemHeight}
                    // onChange={() => onColumnsChanged(col, index, checked)}
                  />
                  <span>{col.title}</span>
                </MenuItem>
              </li>
            );
          }
          return null;
        })}
      </Menu>
    </span>
  );
};

LightTableColumnsButton.propTypes = {
  localization: PropTypes.object,
  columns: PropTypes.array,
  onColumnsChanged: PropTypes.func,
  columnsToDisplay: PropTypes.array,
};

export default LightTableColumnsButton;
