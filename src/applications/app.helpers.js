import { handleAppError } from "./app-errors.js";

// App statuses
export const NOT_LOADED = "NOT_LOADED";
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE";
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED";
export const BOOTSTRAPPING = "BOOTSTRAPPING";
export const NOT_MOUNTED = "NOT_MOUNTED";
export const MOUNTING = "MOUNTING";
export const MOUNTED = "MOUNTED";
export const UPDATING = "UPDATING";
export const UNMOUNTING = "UNMOUNTING";
export const UNLOADING = "UNLOADING";
export const LOAD_ERROR = "LOAD_ERROR";
export const SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN";

// 判断给定的app的状态是否是MOUNTED
export function isActive(app) {
  return app.status === MOUNTED;
}
// 根据当前页面url判断给定的微应用是否应该被激活
export function shouldBeActive(app) {
  try {
    return app.activeWhen(window.location);
  } catch (err) {
    handleAppError(err, app, SKIP_BECAUSE_BROKEN);
    return false;
  }
}

// 获取到给定app的name
export function toName(app) {
  return app.name;
}
// 根据是否包含unmountThisParcel 来判断当前是微应用还是parcel
export function isParcel(appOrParcel) {
  return Boolean(appOrParcel.unmountThisParcel);
}
// 获取微应用类型
// 如果是parcel则返回parcel,否则返回application
export function objectType(appOrParcel) {
  return isParcel(appOrParcel) ? "parcel" : "application";
}
