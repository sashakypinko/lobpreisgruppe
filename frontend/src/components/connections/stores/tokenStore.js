import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import StringHelper from '@/components/helpers/StringHelper';

let token = '';

const tokenStore = {
  set(newToken) {
    token = newToken || '';

    return Storage.save(
      StorageEnums.token,
      StringHelper.encode(token),
    );
  },

  get() {
    return token;
  },

  remove() {
    token = '';
    Storage.remove(StorageEnums.token).then();
  },

  async restoreFromSession() {
    const storedToken = (await Storage.get(StorageEnums.token)) || '';
    token = storedToken ? StringHelper.decode(storedToken) : '';
    return token;
  },
};

export default tokenStore;
