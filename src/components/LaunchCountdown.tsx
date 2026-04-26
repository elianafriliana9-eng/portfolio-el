import { useEffect, useState } from 'react';

interface LaunchCountdownProps {
  className?: string;
  expiredLabel?: string;
  launchDate: string;
  launchTime: string;
  placeholder?: string;
}

interface CountdownState {
  days: string;
  expired: boolean;
  hours: string;
  minutes: string;
  seconds: string;
}

function buildTargetDate(launchDate: string, launchTime: string) {
  const normalizedTime = launchTime.length === 5 ? `${launchTime}:00` : launchTime;
  return new Date(`${launchDate}T${normalizedTime}Z`);
}

function formatUnit(value: number) {
  return String(Math.max(0, value)).padStart(2, '0');
}

function getCountdownState(target: Date): CountdownState {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      expired: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: formatUnit(days),
    hours: formatUnit(hours),
    minutes: formatUnit(minutes),
    seconds: formatUnit(seconds),
    expired: false,
  };
}

export default function LaunchCountdown({
  className,
  expiredLabel = 'LIFTOFF',
  launchDate,
  launchTime,
  placeholder = '--:--:--:--',
}: LaunchCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>(() => ({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    expired: false,
  }));

  useEffect(() => {
    setMounted(true);
    const target = buildTargetDate(launchDate, launchTime);

    const update = () => {
      setCountdown(getCountdownState(target));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [launchDate, launchTime]);

  if (!mounted) {
    return <span className={className}>{placeholder}</span>;
  }

  if (countdown.expired) {
    return <span className={className}>{expiredLabel}</span>;
  }

  return (
    <span className={className}>{`${countdown.days}:${countdown.hours}:${countdown.minutes}:${countdown.seconds}`}</span>
  );
}
