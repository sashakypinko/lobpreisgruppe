import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  scrollWrapper: { overflowX: 'scroll', overflowY: 'hidden' },
};

const LightTableTopScroll = ({
  setScrollRef,
  topScrollHandle,
  bodyWidth,
}) => {
  const classes = useClasses(styles);

  return (
    <div
      className={classes.scrollWrapper}
      ref={setScrollRef}
      onScroll={topScrollHandle}
    >
      <div style={{ width: bodyWidth, height: 20 }} />
    </div>
  );
};

LightTableTopScroll.propTypes = {
  setScrollRef: PropTypes.func,
  topScrollHandle: PropTypes.func,
  bodyWidth: PropTypes.number,
};

export default LightTableTopScroll;
