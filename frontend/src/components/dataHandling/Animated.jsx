import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import PropTypes from 'prop-types';

const defaultMountData = {};

const Animated = ({
  children,
  show,
  setShow,
  mountData = defaultMountData,
  unmountData = defaultMountData,
  unmountTimeout,
  ...rest
}) => {
  const [animationData, setAnimationData] = useState(null);
  const { time, type = 'linear' } = animationData || {};

  const animationCss = animationData?.keyframes ?
    css`animation: ${keyframes`${animationData.keyframes}`} ${time}s ${type}`
    : '';

  useEffect(() => {
    let mounted = true;
    let handler = null;
    let unmountHandler = null;

    if (show) {
      setAnimationData(mountData);
      if (unmountTimeout && setShow) {
        unmountHandler = setTimeout(() => mounted && setShow(false), unmountTimeout);
      }
    } else if (animationData) {
      const { time: unmountTime } = unmountData;
      handler = setTimeout(() => mounted && setAnimationData(null), unmountTime * 1000);
      setAnimationData(unmountData);
    }

    return () => {
      handler && clearTimeout(handler);
      unmountHandler && clearTimeout(unmountHandler);
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountData, unmountData, show]);

  if (!animationData) return null;

  return (
    <Box
      css={animationCss}
      component="div"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Animated;

Animated.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  mountData: PropTypes.object,
  unmountData: PropTypes.object,
  unmountTimeout: PropTypes.number,
};
