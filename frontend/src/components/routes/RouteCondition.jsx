import PropTypes from 'prop-types';

import useRouteMatching from '@/components/routes/hooks/useRouteMatching';

const RouteCondition = ({
  children,
  paths,
  path,
  all = false,
  exclude = false,
  exact = false,
}) => {
  const isRouteMatching = useRouteMatching({
    routeConditions: {
      paths,
      path,
      all,
      exclude,
      exact,
    },
  });

  if (isRouteMatching) return children;

  return null;
};

RouteCondition.propTypes = {
  children: PropTypes.node.isRequired,
  paths: PropTypes.array,
  path: PropTypes.string,
  all: PropTypes.bool,
  exclude: PropTypes.bool,
  exact: PropTypes.bool,
};
export default RouteCondition;
