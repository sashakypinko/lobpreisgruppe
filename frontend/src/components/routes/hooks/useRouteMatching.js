import { matchPath, useLocation } from 'react-router-dom';

const preparePath = (pathElement, exact) => {
  const pathToUse = typeof pathElement === 'object'
    ? pathElement.path
    : pathElement;
  return exact ? pathToUse : `${pathToUse}/*`;
};

export const isRouteMatching = ({
  routeConditions,
  pathname,
}) => {
  if (!routeConditions) return false;

  const {
    paths,
    path,
    all = false,
    exclude = false,
    exact = false,
  } = routeConditions;

  let match = false;

  if (path) match = matchPath(preparePath(path, exact), pathname);

  if (!all && paths?.length) {
    paths.forEach(p => {
      if (matchPath(preparePath(p, exact), pathname)) {
        match = true;
      }
    });
  } else if (all && paths?.length) {
    match = !paths.find(p => !matchPath(preparePath(p, exact), pathname));
  }

  return (match && !exclude) || (!match && exclude);
};

const useRouteMatching = ({
  routeConditions,
}) => {
  const location = useLocation();
  const { pathname } = location;

  return isRouteMatching({
    routeConditions,
    pathname,
  });
};

export default useRouteMatching;
