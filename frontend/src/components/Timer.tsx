import { useEffect, useState, useRef } from 'react';

const Timer = ({ initialMinutes }: { initialMinutes: number }) => {
  // Ensure initialMinutes is a valid number
  const validInitialMinutes = Math.max(0, Math.floor(initialMinutes));
  const [timeLeft, setTimeLeft] = useState(validInitialMinutes * 60);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress =
    validInitialMinutes === 0
      ? 0
      : ((validInitialMinutes * 60 - timeLeft) / (validInitialMinutes * 60)) *
        100;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset timeLeft when initialMinutes changes
    setTimeLeft(validInitialMinutes * 60);

    // Check if initialMinutes is 0. If so, don't start the timer.
    if (validInitialMinutes === 0) {
      return; // Do nothing
    }

    if (timeLeft <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return; // Stop the timer when time is up
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [validInitialMinutes]); // Only depend on validInitialMinutes

  return (
    <div className='relative w-[200px] h-[200px]'>
      <svg className='w-full h-full -rotate-90 transform' viewBox='0 0 100 100'>
        <circle
          className='text-gray-800/20'
          strokeWidth='4'
          stroke='currentColor'
          fill='none'
          r='42'
          cx='50'
          cy='50'
        />
        <circle
          className='text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]'
          strokeWidth='4'
          strokeDasharray={264}
          strokeDashoffset={264 - (progress * 264) / 100}
          strokeLinecap='round'
          stroke='currentColor'
          fill='none'
          r='42'
          cx='50'
          cy='50'
        />
      </svg>

      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <div className="font-['Kdam_Thmor_Pro'] text-[50px] leading-[60px] text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Timer;
