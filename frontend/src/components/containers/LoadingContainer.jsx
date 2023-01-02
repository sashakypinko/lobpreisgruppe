import { useRecoilValue, waitForAll } from 'recoil';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { isLoggedInStore, languageStore, userDataStore } from '@/screens/users/stores/userStore';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';

const LoadingContainer = ({ children }) => {
  const [user] = useRecoilValue(
    waitForAll([
      userDataStore,
      languageStore,
      isLoggedInStore,
    ]),
  );

  const { loading, setLoading, Loading } = useLoading(!!user?._id);

  useEffect(() => {
    if (user?._id) {
      Connections.postRequest(ApiEndpoints.checkUserSession).then(res => res?.ok && setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default LoadingContainer;

LoadingContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
