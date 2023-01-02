import { useSetRecoilState, useRecoilValue } from 'recoil';

import {
  selectedLocationStore,
} from '../stores/LocationStore';

// User data actions
export const useSetSelectedLocation = () => useSetRecoilState(selectedLocationStore);

export const useSelectedLocation = () => useRecoilValue(selectedLocationStore);

export default {
  useSetSelectedLocation,
  useSelectedLocation,
};
