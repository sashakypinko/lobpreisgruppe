import { Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const CustomTooltip = props => {
  const { children, ...rest } = props;
  return (
    <Tooltip {...rest}>
      <Box>
        {children}
      </Box>
    </Tooltip>
  );
};

export default CustomTooltip;

CustomTooltip.propTypes = {
  children: PropTypes.node.isRequired,
};
