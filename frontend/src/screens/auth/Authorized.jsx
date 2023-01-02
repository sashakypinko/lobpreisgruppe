import PropTypes from 'prop-types';

import { useIsAdmin, useLoggedIn, useUserData } from '@/screens/users/hooks/userDataHooks';
import useIsRole from '@/screens/users/hooks/useIsRole';
import { UserRoles } from '@/screens/users/enums/UserEnums';

import AuthHelper from './AuthHelper';

const Authorized = ({
  children, ...rest
}) => {
  const userData = useUserData();
  const isAdmin = useIsAdmin();
  const loggedIn = useLoggedIn();

  const authorized = AuthHelper.isAuthorized({
    ...userData,
    isAdmin,
    loggedIn,
  }, rest);

  // Return component if all check passed
  return children && authorized ? children : null;
};

export default Authorized;

Authorized.propTypes = {
  children: PropTypes.node.isRequired,
};
