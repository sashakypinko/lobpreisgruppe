import { cx } from '@emotion/css';
import PropTypes from 'prop-types';

import './flags.css';

const ComponentToUse = ({ component, ...rest }) => {
  if (component === 'div') return <div {...rest} />;
  return <span {...rest} />;
};

ComponentToUse.propTypes = {
  component: PropTypes.any,
};

const Flag = ({
  language, className = '', component, print, ...rest
}) => (
  <ComponentToUse
    component={component}
    className={cx('flag', language, className)}
    {...rest}
  />
);

Flag.propTypes = {
  language: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.any,
  print: PropTypes.bool,
};

export default Flag;
