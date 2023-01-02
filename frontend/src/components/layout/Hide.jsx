import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

import useMobile from '@/components/layout/hooks/useMobile';

const breakpointsUp = ['xs', 'sm', 'md', 'lg', 'xl'];
const breakpointsDown = breakpointsUp.reverse();

const Hide = ({
  children,
  mobile,
  desktop,
  ...props
}) => {
  const { isMobile } = useMobile();
  const theme = useTheme();

  const highestDown = breakpointsDown.find(b => props[`${b}Down`]);
  const lowestUp = breakpointsUp.find(b => props[`${b}Up`]);

  const matchUp = useMediaQuery(theme.breakpoints.up(lowestUp));
  const matchDown = useMediaQuery(theme.breakpoints.down(highestDown));

  if (highestDown && matchDown) return null;
  if (lowestUp && matchUp) return null;
  if (mobile && isMobile) return null;
  if (desktop && !isMobile) return null;

  return children;
};

export default Hide;

Hide.propTypes = {
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool,
  desktop: PropTypes.bool,
  xsDown: PropTypes.bool,
  xsUp: PropTypes.bool,
  smDown: PropTypes.bool,
  smUp: PropTypes.bool,
  mdDown: PropTypes.bool,
  mdUp: PropTypes.bool,
  lgDown: PropTypes.bool,
  lgUp: PropTypes.bool,
  xlDown: PropTypes.bool,
  xlUp: PropTypes.bool,
};
