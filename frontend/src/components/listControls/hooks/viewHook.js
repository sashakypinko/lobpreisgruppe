import { useSetRecoilState, useRecoilValue } from 'recoil';

import { viewStore, viewSelector } from '../stores/listControlsStore';

export const useSetView = () => useSetRecoilState(viewSelector);

export const useView = () => useRecoilValue(viewStore);

export default {
  useSetView,
  useView,
};
