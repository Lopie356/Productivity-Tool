import { useState, useEffect } from 'react';

type SessionType = 'sophisticated' | 'casual' | null;

export const useSessionManager = () => {
  const [sessionType, setSessionType] = useState<SessionType>(null);
  const [sessionMessage, setSessionMessage] = useState<string>('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const startSophisticatedSession = () => {
    setSessionType('sophisticated');
    setIsSessionActive(true);
    setSessionMessage('Sophisticated session started!');
    startTimer(30); // 30 minutes
  };

  const startCasualSession = () => {
    setSessionType('casual');
    setIsSessionActive(true);
    setSessionMessage('Casual session started!');
    startTimer(30); // 30 minutes
  };

  const endSession = () => {
    setSessionType(null);
    setIsSessionActive(false);
    setSessionMessage('YAY! You were productive for 30 mins! Robo is happy!');
    setTimer(null);
    setRemainingTime(0);
    setTimeout(() => {
      setSessionMessage('');
    }, 5000);
  };

  const startTimer = (minutes: number) => {
    const endTime = Date.now() + minutes * 60 * 1000;
    setTimer(endTime);
    setRemainingTime(minutes * 60);
  };

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(() => {
      const remaining = Math.ceil((timer - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        endSession();
        return;
      }

      setRemainingTime(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return {
    sessionType,
    sessionMessage,
    isSessionActive,
    startSophisticatedSession,
    startCasualSession,
    endSession,
    remainingTime,
  };
};
