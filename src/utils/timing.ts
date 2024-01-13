export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const delay = (fn: () => void) => setTimeout(fn, 0);
