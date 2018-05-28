export const timeStartMs = (ms: number) => new Date(ms).setHours(0, 0, 0, 0);
export const timeEndMs = (ms: number) => new Date(ms).setHours(23, 59, 59, 999);
// TODO: make next functions injectable
export const todayStartMs = () => timeStartMs(Date.now());
export const todayEndMs = () => timeEndMs(Date.now());
