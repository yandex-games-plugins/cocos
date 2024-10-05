export function debounce(func: (...args: any) => any, ms: number) {
  let timeout: number | undefined;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, ms);
  };
}
