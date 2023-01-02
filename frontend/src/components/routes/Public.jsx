import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useLoggedIn, useRedirected } from '@/screens/users/hooks/userDataHooks';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const Public = ({
  element,
}) => {
  const loggedIn = useLoggedIn();
  const redirectedFrom = useRedirected();

  return !loggedIn ? element : (
    <Navigate to={redirectedFrom || UrlEnums.MAIN} />
  );
};

export default Public;

Public.propTypes = {
  element: PropTypes.node.isRequired,
};
