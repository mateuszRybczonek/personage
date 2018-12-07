import { LS_LAST_ACTIVITY_AT_KEY } from '@/consts';

export function setLastActivity() {
  localStorage.setItem(LS_LAST_ACTIVITY_AT_KEY, Date.now());
}

export function getLastActivity() {
  return localStorage.getItem(LS_LAST_ACTIVITY_AT_KEY);
}
