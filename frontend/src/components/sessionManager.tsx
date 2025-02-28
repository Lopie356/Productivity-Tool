import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { useSessionManager } from '../session/useSessionManager';
import RobotAvatar from './Avatar';
import robo from '../assets/Robo.svg';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import RobotAnimation from '../assets/RoboAnimation.json';

const Avatar2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<any>(null);
  const handleMouseEnter = () => {
    if (animationRef.current && animationRef.current.play) {
      animationRef.current.play();
    }
  };

  const handleClick = () => {
    setIsPlaying(true);

    if (animationRef.current && animationRef.current.play) {
      animationRef.current.play(); // Start animation
    }
  };

  const handleComplete = () => {
    setIsPlaying(false); // Reset animation state to allow retriggering
    if (animationRef.current && animationRef.current.goToAndStop) {
      animationRef.current.goToAndStop(0, true); // Reset to the beginning
    }
  };

  const {
    sessionType,
    sessionMessage,
    isSessionActive,
    startSophisticatedSession,
    startCasualSession,
    endSession,
    remainingTime,
  } = useSessionManager();

  const navigate = useNavigate();

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const handleSophisticatedClick = () => {
    navigate('/sophisticated-session');
  };

  const handleStatsClick = () => {
    console.log('Stats clicked');
    navigate('/stats');
  };

  const handleBackClick = () => {
    endSession(); // Reset the session state
  };

  return (
    <div className='relative flex min-h-screen w-full overflow-x-hidden flex-col items-center bg-[#020B24]'>
      {/* Session Message at top when active */}
      {isSessionActive && sessionMessage && (
        <div className='mt-8 bg-[#3454a9] p-6 rounded-[20px] max-w-[377px] text-center'>
          <span className="font-['Kdam_Thmor_Pro'] text-[30px] leading-[40px] text-white">
            {sessionMessage}
          </span>
        </div>
      )}

      {/* Main Content Container */}
      <div className='flex flex-col items-center justify-center flex-grow'>
        {!isSessionActive && (
          <div className='flex gap-8 mb-8'>
            <div className='flex flex-col items-center gap-8 mb-8'>
              {/* Robot Avatar Container */}
              <img src={robo} alt='Robot' />

              {/* Session Type Buttons */}
              <div className='flex gap-8'>
                <Button
                  className='h-[117px] w-[345px] rounded-[20px] bg-[#bc81ff] hover:bg-[#bc81ff]/90 text-[#06184a]'
                  onClick={handleSophisticatedClick}
                  disabled={isSessionActive}
                >
                  <span className="font-['Kdam_Thmor_Pro'] text-[28px] leading-[43px]">
                    Start sophisticated session
                  </span>
                </Button>

                <Button
                  className='h-[117px] w-[316px] rounded-[20px] bg-[#e7d6ff] hover:bg-[#e7d6ff]/90 text-[#06184a]'
                  variant='secondary'
                  onClick={startCasualSession}
                  disabled={isSessionActive}
                >
                  <span className="font-['Kdam_Thmor_Pro'] text-[28px] leading-[43px]">
                    Start casual session
                    <br />
                    [30 mins]
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Timer when session is active */}
        {isSessionActive && (
          <div className='flex flex-col items-center gap-16'>
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className='absolute top-8 left-8 text-white'
            >
              <svg width='113' height='59' viewBox='0 0 113 59' fill='none'>
                <path
                  d='M111 29.5H2M2 29.5L29.5 2M2 29.5L29.5 57'
                  stroke='white'
                  strokeWidth='3'
                />
              </svg>
            </button>
            <div className='cursor-pointer' onMouseEnter={handleMouseEnter}>
              <Lottie
                lottieRef={animationRef}
                animationData={RobotAnimation}
                loop={false}
                autoplay={false}
                onComplete={handleComplete}
              />
            </div>
            <Timer initialMinutes={minutes} />
          </div>
        )}
      </div>
      {/* Stats Button */}
      <Button
        className='absolute top-4 right-4 h-[63px] w-[237px] rounded-[20px] bg-[#5d7fdc] hover:bg-[#5d7fdc]/90'
        variant='secondary'
        onClick={handleStatsClick}
      >
        <span className="font-['Kdam_Thmor_Pro'] text-[25px] leading-[39px] text-white">
          View Stats
        </span>
      </Button>
    </div>
  );
};

export default Avatar2;
