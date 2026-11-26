import { siteConfig } from '../config/siteConfig';

export interface TrialCountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalRemainingMs: number;
}

interface PersistedTrialState {
  expired: boolean;
  deadlineIso: string;
  expiredAtIso: string;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export function getDeadlineTimestamp(deadlineIso: string = siteConfig.trial.deadlineIso): number {
  const parsed = Date.parse(deadlineIso);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid trial deadline ISO string: ${deadlineIso}`);
  }
  return parsed;
}

export function isTrialPersistedExpired(
  deadlineIso: string = siteConfig.trial.deadlineIso,
  storageKey: string = siteConfig.trial.storageKey
): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Partial<PersistedTrialState>;
    return parsed.expired === true && parsed.deadlineIso === deadlineIso;
  } catch {
    return false;
  }
}

export function persistTrialExpired(
  deadlineIso: string = siteConfig.trial.deadlineIso,
  storageKey: string = siteConfig.trial.storageKey
): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: PersistedTrialState = {
      expired: true,
      deadlineIso,
      expiredAtIso: new Date().toISOString(),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    // Ignore storage quota or privacy-mode errors gracefully
  }
}

export function computeTrialCountdown(
  deadlineMs: number,
  nowMs: number = Date.now(),
  persistedExpired: boolean = false
): TrialCountdownState {
  const diff = deadlineMs - nowMs;

  if (persistedExpired || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      totalRemainingMs: 0,
    };
  }

  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    totalRemainingMs: diff,
  };
}

export function padTimerUnit(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0');
}
