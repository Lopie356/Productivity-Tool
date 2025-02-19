import { Button } from './ui/button';

import robo from '../assets/Robo.svg';

interface StatsRowProps {
  date: string;
  time: string;
  duration: string;
  activity: string;
  tasks?: string;
  score: number;
}

const StatsRow = ({
  date,
  time,
  duration,
  activity,
  tasks,
  score,
}: StatsRowProps) => (
  <div className='flex items-center justify-between w-full p-4 bg-[#1c2c56]/40 rounded-lg'>
    <div className="text-white font-['Kdam_Thmor_Pro'] text-lg">{date}</div>
    <div className="text-white font-['Kdam_Thmor_Pro'] text-lg">{time}</div>
    <div className="text-white font-['Kdam_Thmor_Pro'] text-lg">{duration}</div>
    <div className="text-white font-['Kdam_Thmor_Pro'] text-lg">{activity}</div>
    <div className="text-white font-['Kdam_Thmor_Pro'] text-lg">
      {tasks || '-'}
    </div>
    <div className='flex items-center gap-4'>
      <div className='w-[50px] h-[50px] flex items-center justify-center bg-[#4265c3] rounded-lg'>
        {score >= 90 ? (
          <div className='text-[#d0ddff] text-2xl'>😄</div>
        ) : score >= 60 ? (
          <div className='text-[#d0ddff] text-2xl'>🙂</div>
        ) : (
          <div className='text-[#d0ddff] text-2xl'>😔</div>
        )}
      </div>
      <div className="text-white font-['Kdam_Thmor_Pro'] text-lg w-16">
        {score}
      </div>
    </div>
  </div>
);

const StatsView = () => {
  const mockData: StatsRowProps[] = [
    {
      date: '18 Feb',
      time: '5.00-6.00 p.m.',
      duration: '1 hour',
      activity: '60/60 mins',
      score: 100,
    },
    {
      date: '17 Feb',
      time: '4.02-4.10 p.m.',
      duration: '30 mins',
      activity: '8/30 mins',
      score: 28,
    },
    {
      date: '16 Feb',
      time: '4.21-4.40 p.m.',
      duration: '1 hour',
      activity: '19/60 mins',
      tasks: '1/2',
      score: 40,
    },
    {
      date: '15 Feb',
      time: '2.32-3.32 p.m.',
      duration: '1 hour',
      activity: '60/60 mins',
      tasks: '3/3',
      score: 100,
    },
  ];

  return (
    <div className='relative w-full max-w-[1728px] min-h-[1117px] bg-[#020B24] p-8'>
      {/* Back Button */}
      <Button
        variant='ghost'
        className='absolute top-8 left-8 text-white hover:text-white hover:bg-transparent'
      >
        <span className='text-4xl'>←</span>
      </Button>

      {/* Center Content */}
      <div className='flex flex-col items-center justify-center gap-12 mt-16'>
        <img src={robo} alt='ROboAvatar' />

        {/* Average Score */}
        <div className='text-center'>
          <h1 className="text-white font-['Kdam_Thmor_Pro'] text-5xl mb-2">
            Average score: 68
          </h1>
          <p className="text-white font-['Kdam_Thmor_Pro'] text-2xl">
            You can do better!
          </p>
        </div>

        {/* Stats Table */}
        <div className='w-full max-w-[1555px]'>
          {/* Table Header */}
          <div className='flex flex-row gap-48'>
            <div className="text-white font-['Kdam_Thmor_Pro']  text-xl">
              Date
            </div>
            <div className="text-white font-['Kdam_Thmor_Pro']  text-xl">
              Time
            </div>
            <div className="text-white font-['Kdam_Thmor_Pro'] text-xl">
              Duration Target
            </div>
            <div className="text-white font-['Kdam_Thmor_Pro'] mx-5 text-xl">
              Activity
            </div>
            <div className="text-white font-['Kdam_Thmor_Pro'] text-xl">
              Tasks
            </div>
            <div className="text-white font-['Kdam_Thmor_Pro'] text-xl">
              Score
            </div>
          </div>

          {/* Table Rows */}
          <div className='flex flex-col gap-4'>
            {mockData.map((row, index) => (
              <StatsRow key={index} {...row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
