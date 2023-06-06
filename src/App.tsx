import React, { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos, Circle } from '@mui/icons-material';

import Card from './components/Card';
import Header from './components/Header';
import Section from './components/Section';

import SampleFoodImage from './assets/sample-food.jpg';

const slideData = [
  {
    name: 'New Fashion Apparel',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg',
  },
  {
    name: 'In The Wilderness',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg',
  },
  {
    name: 'For Your Current Mood',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg',
  },
  {
    name: 'Focus On The Writing',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slideData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slideData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='text-center h-screen'>
      <header>
        <Header />
      </header>
      <Section customStyle='bg-cover bg-landing-image'>
        <h1 className='relative z-1 text-6xl font-semibold'>
          FIND YOUR <p className='text-8xl font-semibold'>RECIPE</p>
        </h1>
        <p className='w-1/2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc
          ut sem vitae risus tristique posuere.
        </p>
      </Section>
      <Section customStyle='p-10'>
        <h2 className='text-lg font-semibold mb-5'>
          Want to learn cook but confused how to start?
          <br />
          Let's start cooking with popular recipes
        </h2>
        <div className='flex flex-row justify-between items-center'>
          <Card src={SampleFoodImage} title='Tofu poke' time={20} />
          <Card src={SampleFoodImage} title='Tofu poke' time={20} />
          <Card src={SampleFoodImage} title='Tofu poke' time={20} />
        </div>
      </Section>
      <Section customStyle='p-16 relative group'>
        <h3 className='text-lg font-semibold mb-5'>
          Discover more dishes by exploring what's new
        </h3>
        <div
          style={{ backgroundImage: `url(${slideData[currentIndex].src})` }}
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500 max-h-[90%]'
        ></div>
        {/* left arrow */}
        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl rounded-full p-2  cursor-pointer'>
          <ArrowBackIos sx={{ width: 30, height: 30 }} onClick={prevSlide} />
        </div>
        {/* right arrow */}
        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4 text-2xl rounded-full p-2 cursor-pointer'>
          <ArrowForwardIos sx={{ width: 30, height: 30 }} onClick={nextSlide} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {slideData.map((slide, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className='mr-2 text-2xl cursor-pointer'
            >
              <Circle
                sx={{
                  width: 10,
                  height: 10,
                  color: index === currentIndex ? 'black' : 'gray',
                }}
              />
            </div>
          ))}
        </div>
      </Section>
      {/* Sign up/Sign in page */}
      {/* <div className='w-full h-full p-10 flex items-center justify-center'>
        <form className='w-full max-w-sm'>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='inline-full-name'
              >
                Full Name
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                id='inline-full-name'
                type='text'
              />
            </div>
          </div>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='inline-password'
              >
                Password
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                id='inline-password'
                type='password'
                placeholder='******************'
              />
            </div>
          </div>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'></div>
            <label className='md:w-2/3 block text-gray-500 font-bold'>
              <input className='mr-2 leading-tight' type='checkbox' />
              <span className='text-sm'>Send me your newsletter!</span>
            </label>
          </div>
          <div className='md:flex md:items-center'>
            <div className='md:w-1/3'></div>
            <div className='md:w-2/3'>
              <button
                className='shadow bg-black hover:bg-black-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                type='button'
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div> */}
      <Section customStyle='p-10'>
        <div className='flex flex-col justify-center items-center w-[70%]'>
          <h4 className='text-lg font-semibold mb-5'>
            Subscribe to get weekly recipe updates
          </h4>
          <div className='mb-5'>
            <input
              className='appearance-none border-2 border-r-0 border-gray-200 rounded-l-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black'
              type='email'
              placeholder='your@email.com'
            />
            <button className=' shadow-md text-sm border-2 border-[#ff512e] bg-[#ff512e] text-white p-2 rounded-r-md'>
              Contact
            </button>
          </div>
          <p>
            We won't send you spam.
            <br />
            Unsubscribe at any time.
          </p>
        </div>
      </Section>
      <footer>
        <div className='py-5'>
          <p className='text-xs font-light text-gray-300'>
            ⓒ 2023. Hyerin Moon all rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
