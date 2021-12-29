import idb from 'idb-keyval';


class Storage {
  public static prefixKey(key: String) {
    return 'flcn_ecomm_' + key;
  }

  public static async set(key: String, value) {
    key = Storage.prefixKey(key);

    return await idb.set(key, value);
  }

  public static async get(key: String, defaultValue = null) {
    key = Storage.prefixKey(key);

    let value = await idb.get(key);

    return value || defaultValue;
  }

  public static async delete(key: String) {
    key = Storage.prefixKey(key);

    return await idb.del(key);
  }

  public static async getMany(keys: String[], defaultValue = {}) {
    keys = keys.map(Storage.prefixKey)

    let value = await idb.getMany(keys);

    return value || defaultValue;
  }

  public static async deleteMany(keys: String[]) {
    keys = keys.map(Storage.prefixKey)

    return await idb.delMany(keys);
  }
}

export default Storage;