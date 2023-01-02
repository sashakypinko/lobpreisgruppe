import {
  atom,
} from 'recoil';

export const tableFilterStore = atom({
  key: 'tableFilterStore',
  default: {},
});

export const latestFilterIndexStore = atom({
  key: 'latestFilterIndexStore',
  default: -1,
});

export default { tableFilterStore };
