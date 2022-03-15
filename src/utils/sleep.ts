export const SECONDS = 1000;
export const MINUTES = SECONDS * 60;
export const HOURS = MINUTES * 60;
export const DAYS = HOURS * 24;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
