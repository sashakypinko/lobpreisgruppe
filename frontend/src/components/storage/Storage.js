import localForage from 'localforage';

import StorageEnums from '@/components/storage/enums/StorageEnums';

localForage.config({
  name: 'lobpreisgruppe',
});

const Storage = {
  async save(field, value) {
    return localForage.setItem(field, value);
  },

  async get(field) {
    return localForage.getItem(field);
  },

  async getObject(field) {
    return localForage.getItem(field);
  },

  async saveObject(field, object) {
    return localForage.setItem(field, object);
  },

  async remove(field) {
    return localForage.removeItem(field);
  },

  async clear() {
    return localForage.clear();
  },

  async clearUserRelatedData() {
    this.remove(StorageEnums.token).then();
    this.remove(StorageEnums.userData).then();
    this.remove(StorageEnums.view).then();
  },

  async getAll() {
    const result = {};
    const keys = await localForage.keys();
    for (const key of keys) {
      // eslint-disable-next-line no-await-in-loop
      result[key] = await this.get(key);
    }
    return result;
  },

  async getSessionItem(field) {
    return new Promise(resolve => {
      const item = sessionStorage.getItem(field);
      resolve(item || '');
    });
  },

  async setSessionItem(field, value) {
    return new Promise(resolve => {
      sessionStorage.setItem(field, value);
      resolve(field);
    });
  },

  async removeSessionItem(field) {
    sessionStorage.removeItem(field);
  },
};

export default Storage;
