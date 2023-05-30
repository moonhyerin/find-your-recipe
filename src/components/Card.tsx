import React from 'react';

import Clock from '../assets/clock.png';

type PropsType = {
  src: string;
  title: string;
  time: number;
};

const Card = (props: PropsType) => {
  const { src, title, time } = props;

  return (
    <div className='rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mr-4'>
      <div
        className='relative overflow-hidden bg-cover bg-no-repeat'
        data-te-ripple-init
        data-te-ripple-color='light'
      >
        <img className='rounded-t-lg w-[100%]' src={src} alt='' />
        <a href='#!'>
          <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
        </a>
      </div>
      <div className='p-6 flex flex-col items-center'>
        <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
          {title}
        </h5>
        <span className='flex flex-row items-center text-base text-neutral-600 dark:text-neutral-200'>
          <img alt='' src={Clock} className='w-3 h-3 mr-2' />
          {time}
        </span>
      </div>
    </div>
  );
};

export default Card;
