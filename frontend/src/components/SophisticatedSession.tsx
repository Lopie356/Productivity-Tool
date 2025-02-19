import { useState, useRef } from 'react';
import { Button } from './ui/button';
import RobotAvatar from './Avatar';
import Timer from './Timer';
import robo from '../assets/Robo.svg';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import RobotAnimation from '../assets/RoboAnimation.json';

interface Task {
  id: number;
  text: string;
}

const SophisticatedSession = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<any>(null);

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

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };
  const handleOnClickStats = () => {
    console.log('Stats clicked');
    navigate('/stats');
  };

  const [duration, setDuration] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
  ]);
  const [description, setDescription] = useState('');
  const [initialMinutes, setInitialMinutes] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionType, setSessionType] = useState<
    'sophisticated' | 'casual' | null
  >(null);

  const handleTaskChange = (id: number, text: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
  };

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, text: '' }]);
  };

  const startTimer = () => {
    let minutes = 0;
    switch (duration) {
      case '20 mins':
        minutes = 20;
        break;
      case '30 mins':
        minutes = 30;
        break;
      case '45 mins':
        minutes = 45;
        break;
      case '1 hour':
        minutes = 60;
        break;
      case 'Custom': {
        const customMinutes = prompt('Enter custom minutes:');
        minutes = parseInt(customMinutes || '0', 10);
        if (isNaN(minutes)) return;
        break;
      }
      default:
        return;
    }
    setInitialMinutes(minutes);
    setIsTimerActive(true);
    setSessionType('sophisticated');
  };

  const startCasualSession = () => {
    setInitialMinutes(30); // Casual session is always 30 mins
    setIsTimerActive(true);
    setSessionType('casual');
  };

  // If timer is active, show timer view
  if (isTimerActive && initialMinutes !== null) {
    return (
      <div className='min-h-screen w-full bg-[#020B24]  flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-8'>
          <Lottie
            onClick={handleClick}
            lottieRef={animationRef} // Assign the ref
            animationData={RobotAnimation}
            loop={false} // Important: Set loop to false if you want it to play once per click
            autoplay={false} // Important: Set autoplay to false to control it with state
            onComplete={handleComplete}
          />
          <Timer key={initialMinutes} initialMinutes={initialMinutes} />
          <div className="font-['Kdam_Thmor_Pro'] text-white text-xl">
            {sessionType === 'casual'
              ? 'Casual Session'
              : 'Sophisticated Session'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-[#020B24] p-8 relative'>
      {/* Back Arrow */}
      <button
        onClick={handleBackButton}
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

      {/* Stats Button */}
      <Button
        className='absolute top-8 right-8 h-[63px] w-[237px] rounded-[20px] bg-[#5d7fdc] hover:bg-[#5d7fdc]/90'
        variant='secondary'
        onClick={handleOnClickStats}
      >
        <span className="font-['Kdam_Thmor_Pro'] text-[25px] leading-[39px] text-white">
          View Stats
        </span>
      </Button>

      {/* Robot Avatar */}

      <img src={robo} alt='Robot' />
      {/* Title */}
      <h1 className="font-['Kdam_Thmor_Pro'] text-[55px] leading-[85px] text-[#e7d6ff] mb-12 text-center">
        Create sophisticated session
      </h1>

      <div className='max-w-6xl mx-auto grid grid-cols-3 gap-8'>
        {/* Duration Selection */}
        <div>
          <h2 className="font-['Kdam_Thmor_Pro'] text-white text-xl mb-4">
            Select duration:
          </h2>
          <div className='flex flex-col gap-4'>
            {['20 mins', '30 mins', '45 mins', '1 hour', 'Custom'].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => setDuration(option)}
                  className={`
                    h-[50px] 
                    rounded-[20px] 
                    font-['Kdam_Thmor_Pro'] 
                    transition-all 
                    duration-200 
                    ${
                      duration === option
                        ? 'bg-[#2c4ea3] border-2 border-[#5d7fdc] shadow-lg transform scale-105' // Selected state
                        : 'bg-[#4265c3] hover:bg-[#3a59ac]' // Unselected state
                    } 
                    text-white 
                    hover:shadow-md
                    active:transform 
                    active:scale-95
                  `}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <h2 className="font-['Kdam_Thmor_Pro'] text-white text-xl mb-4">
            Decide tasks to complete:
          </h2>
          <div className='flex flex-col gap-4'>
            {tasks.map((task) => (
              <input
                key={task.id}
                type='text'
                placeholder={
                  task.id === 1 ? 'Type here...' : 'Type here... [optional]'
                }
                value={task.text}
                onChange={(e) => handleTaskChange(task.id, e.target.value)}
                className="h-[50px] rounded-[20px] bg-[#738fdd] text-white placeholder-white/70 px-4 font-['Kdam_Thmor_Pro']"
              />
            ))}
            <button
              onClick={addTask}
              className='h-[40px] w-[40px] rounded-full bg-[#5d7fdc] text-white flex items-center justify-center text-2xl'
            >
              +
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-['Kdam_Thmor_Pro'] text-white text-xl mb-4">
            Add description (optional):
          </h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Type here...'
            className="w-full h-[200px] rounded-[20px] bg-[#738fdd] text-white placeholder-white/70 p-4 font-['Kdam_Thmor_Pro'] resize-none"
          />
        </div>
      </div>

      {/* Start Button */}
      <div className='flex justify-center mt-12'>
        <Button
          className='h-[91px] w-[263px] rounded-[20px] bg-[#5d7fdc] hover:bg-[#5d7fdc]/90 disabled:bg-gray-500'
          onClick={startTimer}
        >
          <span className="font-['Kdam_Thmor_Pro'] text-[32px] leading-[39px] text-white">
            START
          </span>
        </Button>
      </div>

      {/* Casual Session Button */}
      <div className='absolute bottom-8 right-8'>
        <Button
          className='h-[63px] w-[237px] rounded-[20px] bg-[#f0e68c] hover:bg-[#f0e68c]/90'
          onClick={startCasualSession}
        >
          <span className="font-['Kdam_Thmor_Pro'] text-[16px] leading-[20px] text-[#020B24]">
            Start casual session
            <br />
            [30 mins]
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SophisticatedSession;
