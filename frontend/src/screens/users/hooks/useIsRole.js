import { useUserData } from '@/screens/users/hooks/userDataHooks';

const useIsRole = role => {
  const { roles } = useUserData();

  return roles.includes(role);
};

export default useIsRole;
