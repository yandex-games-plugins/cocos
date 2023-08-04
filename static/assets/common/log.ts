import { PACKAGE_NAME } from "./constants";

export const log = (...data: any[]) => {
  console.log(`[${PACKAGE_NAME}]`, ...data);
};

export const warn = (...data: any[]) => {
  console.warn(`[${PACKAGE_NAME}]`, ...data);
};

export const error = (...data: any[]) => {
  console.error(`[${PACKAGE_NAME}]`, ...data);
};
