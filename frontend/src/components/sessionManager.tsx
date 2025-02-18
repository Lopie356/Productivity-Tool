import { useState } from 'react';
import { Button } from './ui/button';
import { useSessionManager } from '../session/useSessionManager';
import RobotAvatar from './Avatar';
import robo from '../assets/Robo.svg';
import Timer from './Timer';
// const Timer = ({ minutes, seconds }: { minutes: number; seconds: number }) => (
//   <div className='flex flex-col items-center gap-4'>
//     <div className="font-['Kdam_Thmor_Pro'] text-[100px] leading-[120px] text-white">
//       {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
//     </div>
//     <span className="font-['Kdam_Thmor_Pro'] text-[30px] leading-[40px] text-white">
//       Time Remaining
//     </span>
//   </div>
// );

const Avatar2 = () => {
  const {
    sessionType,
    sessionMessage,
    isSessionActive,
    startSophisticatedSession,
    startCasualSession,
    endSession,
    remainingTime,
  } = useSessionManager();

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className='relative flex h-screen w-full flex-col items-center bg-[#020B24]'>
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
            <div className='flex flex-col  items-center gap-8 mb-8'>
              {/* Robot Avatar Container */}
              <img src={robo} alt='Robot' />

              {/* Session Type Buttons */}
              <div className='flex gap-8'>
                <Button
                  className='h-[117px] w-[345px] rounded-[20px] bg-[#bc81ff] hover:bg-[#bc81ff]/90 text-[#06184a]'
                  onClick={startSophisticatedSession}
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
            {' '}
            <img src={robo} alt='Robot' className='w-[265px] h-[175px]' />
            <Timer initialMinutes={minutes} />
          </div>
        )}
      </div>
      {/* Stats Button */}
      <Button
        className='absolute top-4 right-4 h-[63px] w-[237px] rounded-[20px] bg-[#5d7fdc] hover:bg-[#5d7fdc]/90'
        variant='secondary'
      >
        <span className="font-['Kdam_Thmor_Pro'] text-[25px] leading-[39px] text-white">
          View Stats
        </span>
      </Button>
    </div>
  );
};

export default Avatar2;
