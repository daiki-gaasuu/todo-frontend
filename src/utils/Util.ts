/**
 * forEach Promise化して実行
 *
 * @param array
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function asyncForEach(array: any[], callback: any) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

/**
 *
 * map Promise化して実行
 * @param array
 * @param operation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function asyncMap(array: any[], operation: any) {
  // eslint-disable-next-line no-return-await
  return Promise.all(array.map(async item => await operation(item)));
}

export function toUpperFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterUniqueOrderDetailsByuuid(array: any[]) {
  // idを集約した配列を作成
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuUuids = array.map((item: any) => {
    return item.menuUuid;
  });
  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return array.filter((item: any, index: number) => {
    // console.log(item);
    // console.log(itemIds.indexOf(item.menu.uuid));
    return menuUuids.indexOf(item.menuUuid) === index;
  });
}

/**
 * 文字列省略
 * @param str
 * @param len
 */
export function truncate(str: string, len: number) {
  return str.length <= len ? str : `${str.substr(0, len)}...`;
}
