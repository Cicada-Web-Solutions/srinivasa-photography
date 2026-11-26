import { siteConfig } from '../config/siteConfig';
import { padTimerUnit, type TrialCountdownState } from '../utils/trialTimer';

interface TrialBannerProps {
  countdown: TrialCountdownState;
}

export function TrialBanner({ countdown }: TrialBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-[#102923] border-b border-[#C6A64D]/25 px-3 py-2 text-[#F5F0E5]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[10px] sm:text-xs tracking-[0.18em] uppercase">
        <span className="text-[#D9CEB8] font-medium">
          {siteConfig.trial.announcementLabel}
        </span>

        {countdown.isExpired ? (
          <span className="font-semibold text-[#C6A64D] tracking-[0.22em]">
            {siteConfig.trial.expiredTitle}
          </span>
        ) : (
          <div className="tabular-nums-timer flex items-center gap-1.5 sm:gap-2 font-semibold text-[#C6A64D]">
            <span>{padTimerUnit(countdown.days)} DAYS</span>
            <span className="text-[#C6A64D]/50">:</span>
            <span>{padTimerUnit(countdown.hours)} HOURS</span>
            <span className="text-[#C6A64D]/50">:</span>
            <span>{padTimerUnit(countdown.minutes)} MINUTES</span>
            <span className="text-[#C6A64D]/50">:</span>
            <span>{padTimerUnit(countdown.seconds)} SECONDS</span>
          </div>
        )}
      </div>
    </div>
  );
}
