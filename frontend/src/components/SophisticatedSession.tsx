import { useState } from 'react';
import { Button } from './ui/button'; // Assuming Button component exists
import RobotAvatar from './Avatar';

interface Task {
  id: number;
  text: string;
}

const SophisticatedSession = () => {
  const [duration, setDuration] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
  ]);
  const [description, setDescription] = useState('');

  const handleTaskChange = (id: number, text: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
  };

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, text: '' }]);
  };

  return (
    <div className='min-h-screen w-full bg-[#020B24] p-8 relative'>
      {/* Back Arrow */}
      <button className='absolute top-8 left-8 text-white'>
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
      >
        <span className="font-['Kdam_Thmor_Pro'] text-[25px] leading-[39px] text-white">
          View Stats
        </span>
      </Button>

      {/* Robot Avatar */}
      <div className='flex justify-center mb-8'>
        <RobotAvatar />
      </div>

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
                  className={`h-[50px] rounded-[20px] font-['Kdam_Thmor_Pro'] ${
                    duration === option ? 'bg-[#5d7fdc]' : 'bg-[#4265c3]'
                  } text-white hover:bg-[#5d7fdc]/90 transition-colors`}
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
          disabled={!duration || !tasks[0].text}
        >
          <span className="font-['Kdam_Thmor_Pro'] text-[32px] leading-[39px] text-white">
            START
          </span>
        </Button>
      </div>

      {/* Casual Session Button */}
      <div className='absolute bottom-8 right-8'>
        <Button className='h-[63px] w-[237px] rounded-[20px] bg-[#f0e68c] hover:bg-[#f0e68c]/90'>
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
