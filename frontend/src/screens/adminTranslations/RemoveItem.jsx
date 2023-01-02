import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Clear } from '@mui/icons-material';

const RemoveItem = ({ row, renderProps }) => {
  const { onConfirm } = renderProps;
  const { id } = row;

  return (
    <Button onClick={() => onConfirm(id)}>
      <Clear />
    </Button>
  );
};

export default RemoveItem;

RemoveItem.propTypes = {
  row: PropTypes.object.isRequired,
  renderProps: PropTypes.object.isRequired,
};
