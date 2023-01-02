import { useEffect } from 'react';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import { useLogoutUser } from '@/screens/users/hooks/userDataHooks';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';

const Logout = () => {
  const logout = useLogoutUser();

  useEffect(() => {
    (async () => {
      const tokenPromise = Storage.remove(StorageEnums.token);
      const udPromise = Storage.remove(StorageEnums.userData);

      await Promise.all([tokenPromise, udPromise]);
      const logoutUser = async () => {
        await Connections.postRequest(ApiEndpoints.logout);
      };
      logoutUser()
        .then(() => {
          (async () => {
            await Storage.clear();
          })();
        });
      logout(null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div/>;
};

export default Logout;
