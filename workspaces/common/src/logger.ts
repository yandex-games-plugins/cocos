import { plugin } from "./constants";

export const logger = {
  info: (...data: any[]) => {
    console.log(`[${plugin.name}]`, ...data);
  },
  warn: (...data: any[]) => {
    console.warn(`[${plugin.name}]`, ...data);
  },
  error: (...data: any[]) => {
    console.error(`[${plugin.name}]`, ...data);
  },
};
