import React, { useState, useEffect } from 'react';

import { ArrowBackIos, ArrowForwardIos, Circle } from '@mui/icons-material';

import Card from './components/Card';
import Header from './components/Header';
import Section from './components/Section';

type RecipeType = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
};

const API_URL = process.env.REACT_APP_API_URL_LANDING_PAGE!;
const API_HOST = process.env.REACT_APP_API_HOST!;
const API_KEY = process.env.REACT_APP_API_KEY!;

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popular, setPopular] = useState<RecipeType[]>([]);
  const [random, setRandom] = useState<RecipeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const check = localStorage.getItem('recipes');

      if (check) {
        const data = JSON.parse(check);
        setPopular(data.slice(0, 3));
        setRandom(data.slice(3));
      } else {
        try {
          const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': API_HOST,
            },
          });
          const result = await response.json();
          const data = result.recipes;

          localStorage.setItem('recipes', JSON.stringify(data));

          setPopular(data.slice(0, 3));
          setRandom(data.slice(3));
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? random.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === random.length - 1;
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
      <Section customStyle='bg-cover bg-landing-image h-full'>
        <h1 className='relative z-1 text-5xl sm:text-6xl font-semibold'>
          FIND YOUR <p className='text-7xl sm:text-8xl font-semibold'>RECIPE</p>
        </h1>
        <p className='w-1/2 text-sm sm:text-base'>
          Welcome to our recipe hub! Explore a diverse range of mouthwatering
          recipes, from classics to innovative dishes. With easy-to-follow
          instructions and stunning visuals, we'll inspire your culinary
          creativity and leave you wanting more. Join us on this flavorful
          journey and elevate your cooking skills today!
        </p>
      </Section>
      <Section customStyle='p-10 md:h-full'>
        <h2 className='text-md sm:text-lg font-semibold mb-5'>
          Want to learn cook but confused how to start?
          <br />
          Let's start cooking with popular recipes
        </h2>
        <div className='flex flex-col md:flex-row justify-between items-center w-[100%]'>
          {popular.map((recipe) => (
            <Card
              src={recipe.image}
              title={recipe.title}
              time={recipe.readyInMinutes}
            ></Card>
          ))}
        </div>
      </Section>
      <Section customStyle='p-14 h-full relative group'>
        <h3 className='text-md sm:text-lg font-semibold mb-5'>
          Discover more dishes by exploring what's new
        </h3>
        {random.length && (
          <div
            style={{ backgroundImage: `url(${random[currentIndex].image})` }}
            className='flex items-center justify-center w-full lg:w-1/2 h-2/3 rounded-2xl bg-center bg-cover duration-500 max-h-[50%] md:max-h-[90%] cursor-pointer'
          >
            <div className='w-[100%] h-[100%] rounded-2xl bg-black/[.6] text-white opacity-0 hover:opacity-100 transition-opacity'>
              <p className='w-[100%] h-[100%] flex justify-center items-center translate-y-3 transition-transform hover:translate-y-0 text-2xl font-bold'>
                {random[currentIndex].title}
              </p>
            </div>
          </div>
        )}
        {/* left arrow */}
        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl rounded-full p-2  cursor-pointer'>
          <ArrowBackIos sx={{ width: 30, height: 30 }} onClick={prevSlide} />
        </div>
        {/* right arrow */}
        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4 text-2xl rounded-full p-2 cursor-pointer'>
          <ArrowForwardIos sx={{ width: 30, height: 30 }} onClick={nextSlide} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {random.map((slide, index) => (
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
      <Section customStyle='p-10 md:h-full'>
        <div className='flex flex-col justify-center items-center'>
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
