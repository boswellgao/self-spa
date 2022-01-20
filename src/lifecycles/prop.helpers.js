import * as singleSpa from "../single-spa.js";
import { mountParcel } from "../parcels/mount-parcel.js";
import { assign } from "../utils/assign.js";
import { isParcel, toName } from "../applications/app.helpers.js";
import { formatErrorMessage } from "../applications/app-errors.js";

// 获取指定应用的customProps
export function getProps(appOrParcel) {
  const name = toName(appOrParcel);
  let customProps =
    typeof appOrParcel.customProps === "function"
      ? appOrParcel.customProps(name, window.location)
      : appOrParcel.customProps;
  if (
    typeof customProps !== "object" ||
    customProps === null ||
    Array.isArray(customProps)
  ) {
    customProps = {};
    console.warn(
      formatErrorMessage(
        40,
        __DEV__ &&
          `single-spa: ${name}'s customProps function must return an object. Received ${customProps}`
      ),
      name,
      customProps
    );
  }
  const result = assign({}, customProps, {
    name,
    mountParcel: mountParcel.bind(appOrParcel), // 每个微应用增加一个mountParcel
    singleSpa, // 每个微应用的props增加一个singlespa实例
  });

  if (isParcel(appOrParcel)) {
    //如果当前应用是个parcel则赋值一个unmountSelf
    result.unmountSelf = appOrParcel.unmountThisParcel;
  }

  return result;
}
