/*
 * action类型
 */
export const USER_INFO = 'USER_INFO';

/*
 * 其它的常量
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action创建函数
 */

export function readUser(userInfo) {
  return { type: USER_INFO, userInfo }
}
