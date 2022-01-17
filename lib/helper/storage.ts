import * as idb from "idb-keyval"

class Storage {
  public static prefixKey(key: string) {
    return "flcn_ecomm_" + key
  }

  public static async set(key: string, value: any) {
    key = Storage.prefixKey(key)

    return await idb.set(key, value)
  }

  public static async get(key: string, defaultValue = null) {
    key = Storage.prefixKey(key)

    const value = await idb.get(key)

    return value || defaultValue
  }

  public static async delete(key: string) {
    key = Storage.prefixKey(key)

    return await idb.del(key)
  }

  public static async getMany(keys: string[], defaultValue = {}) {
    keys = keys.map(Storage.prefixKey)

    const value = await idb.getMany(keys)

    return value || defaultValue
  }

  public static async deleteMany(keys: string[]) {
    keys = keys.map(Storage.prefixKey)

    return await idb.delMany(keys)
  }
}

export default Storage
