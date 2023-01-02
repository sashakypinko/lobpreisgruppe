import { IconButton, Tooltip } from '@mui/material';
import { GetApp } from '@mui/icons-material';
import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';

const LightTableCsvButton = ({
  localization,
  columns,
  rows,
  tableKey,
  exportFileName,
}) => {
  const exportCsv = () => {
    const createRow = mapCallback => `${columns.map(mapCallback).join(',')}\n`;
    let csv = createRow(({ title }) => title);
    rows.forEach(row => {
      csv += createRow(({ field }) => row[field]);
    });

    fileDownload(csv, `${exportFileName || tableKey}.csv`);
  };

  return (
    <Tooltip title={localization.exportCsvTitle}>
      <IconButton
        color="inherit"
        size="large"
        onClick={exportCsv}
      >
        <GetApp fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

LightTableCsvButton.propTypes = {
  localization: PropTypes.object,
  columns: PropTypes.array,
  rows: PropTypes.array,
  tableKey: PropTypes.string,
  exportFileName: PropTypes.string,
};

export default LightTableCsvButton;
