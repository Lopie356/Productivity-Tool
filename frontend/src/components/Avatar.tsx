const RobotAvatar = () => (
  <div className='relative'>
    {/* Robot Head */}
    <div className='relative'>
      <div className='h-[175px] w-[265px] rounded-[50px] bg-[#6e8ee4]' />
      <div className='absolute left-[11px] top-[10px] h-[156px] w-[243px] rounded-[50px] bg-white' />
      <div className='absolute left-[8.5px] top-[9px] h-[157px] w-[248px] rounded-[50px] bg-[#c0d1ff]' />

      {/* Robot Face Screen */}
      <div className='absolute left-[41px] top-[32px]'>
        <div className='h-[112px] w-[183px] rounded-[30px] border border-[#858585] bg-[#1c2c56]' />
        <div className='absolute left-[0.5px] top-[0.5px] h-[111px] w-[182px] rounded-[30px] border border-[#4265c3] bg-[#738fdd]' />
        <div className='absolute left-[4.5px] top-[4px] h-[103px] w-[175px] rounded-[30px] border border-[#616161] bg-[#4265c3]'>
          {/* Robot Eyes and Mouth - Happy Expression */}
          <div className='absolute left-[40px] top-[30px] flex gap-8'>
            <div className='h-5 w-6 border-2 border-[#d0ddff] rounded-full' />
            <div className='h-5 w-6 border-2 border-[#d0ddff] rounded-full' />
          </div>
          <div className='absolute left-[42px] top-[60px] h-[19px] w-[92px] border-2 border-[#d0ddff] rounded-full' />
        </div>
      </div>
    </div>

    {/* Robot Antenna */}
    <div className='absolute left-1/2 top-[-35px] -translate-x-1/2'>
      <div className='h-[30px] w-[30px] rounded-full bg-[#c19805]' />
      <div className='absolute left-[2px] top-[2px] h-[26px] w-[26px] rounded-full bg-[#fff59f]' />
      <div className='absolute left-[11.5px] top-[-24px] h-[24px] w-[7px] rounded-[20px] bg-[#f1f1f1]' />
    </div>
  </div>
);

export default RobotAvatar;
