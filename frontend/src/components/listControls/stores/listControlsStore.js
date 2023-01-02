import {
  atom,
  selector,
} from 'recoil';

import BasicConfig from '@/components/config/BasicConfig';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import Storage from '@/components/storage/Storage';

const {
  viewTypes,
} = BasicConfig;

export const viewStore = atom({
  key: 'view',
  default: selector({
    key: 'view/default',
    get: async () => {
      const localStorageData = await Storage.get(StorageEnums.view);
      return localStorageData || viewTypes[0].name;
    },
  }),
});

export const viewSelector = selector({
  key: 'viewSelector',
  get: ({ get }) => get(viewStore),
  set: ({
    set,
  }, data) => {
    Storage.save(StorageEnums.view, data).then();
    set(viewStore, data);
  },
});

export default {
  viewStore,
};
