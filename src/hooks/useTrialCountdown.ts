import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import {
  computeTrialCountdown,
  getDeadlineTimestamp,
  isTrialPersistedExpired,
  persistTrialExpired,
  type TrialCountdownState,
} from '../utils/trialTimer';

export function useTrialCountdown(
  deadlineIso: string = siteConfig.trial.deadlineIso
): TrialCountdownState {
  const deadlineMs = getDeadlineTimestamp(deadlineIso);

  const [state, setState] = useState<TrialCountdownState>(() => {
    const alreadyPersisted = isTrialPersistedExpired(deadlineIso);
    const initial = computeTrialCountdown(deadlineMs, Date.now(), alreadyPersisted);
    if (initial.isExpired && !alreadyPersisted) {
      persistTrialExpired(deadlineIso);
    }
    return initial;
  });

  useEffect(() => {
    const checkAndUpdate = () => {
      const persisted = isTrialPersistedExpired(deadlineIso);
      const next = computeTrialCountdown(deadlineMs, Date.now(), persisted);
      if (next.isExpired && !persisted) {
        persistTrialExpired(deadlineIso);
      }
      setState(next);
    };

    checkAndUpdate();
    const intervalId = window.setInterval(checkAndUpdate, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [deadlineIso, deadlineMs]);

  return state;
}
