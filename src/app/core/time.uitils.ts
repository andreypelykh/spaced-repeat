import { InjectionToken } from '@angular/core';

export const timeStartMs = (ms: number) => new Date(ms).setHours(0, 0, 0, 0);
export const timeEndMs = (ms: number) => new Date(ms).setHours(23, 59, 59, 999);

export const TODAY_START_MS = new InjectionToken<string>(
  'today start in miliseconds'
);
export const TODAY_END_MS = new InjectionToken<string>(
  'today end in miliseconds'
);

export const todayStartMs = () => timeStartMs(Date.now());
export const todayEndMs = () => timeEndMs(Date.now());
