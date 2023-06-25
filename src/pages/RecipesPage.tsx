import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from '@mui/material';

import BaseSection from '../components/BaseSection';
import SearchSection from '../components/SearchSection';
import Label from '../components/Label';

import Clock from '../assets/clock.png';

import { API_URL, API_HOST, API_KEY } from '../constant';
import { RandomRecipeType } from '../types';

function RecipesPage() {
  const [randomRecipes, setRandomRecipes] = useState<RandomRecipeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const check = localStorage.getItem('randomRecipes');

      if (check) {
        const data = JSON.parse(check);
        setRandomRecipes(data);
      } else {
        const options = {
          method: 'GET',
          url: API_URL,
          params: {
            number: '30',
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        };

        try {
          const response = await axios.request(options);
          const data = response.data.recipes;

          localStorage.setItem('randomRecipes', JSON.stringify(data));

          setRandomRecipes(data);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, []);

  const renderRecipes = () => {
    return randomRecipes.map((recipe) => (
      <div className='p-3 my-2 sm:w-[49%] md:w-[32%] lg:w-[24%] xl:w-[19%] bg-white border-2 hover:border-b-4 hover:border-b-[#ff512e] cursor-pointer'>
        <img alt='' src={recipe.image} />
        <div className='my-2'>
          {recipe.dishTypes.map(
            (dishType, i) =>
              i < 3 && (
                <Label value={dishType} customStyle='m-1 p-1 !rounded-md' />
              )
          )}
          {recipe.dishTypes.length > 3 && (
            <Tooltip title={recipe.dishTypes.join(',')} placement='bottom'>
              <p className='text-xs'>+{recipe.dishTypes.length - 3}</p>
            </Tooltip>
          )}
        </div>
        <div className='py-2 flex flex-col items-center w-[100%]'>
          <p className='mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-ellipsis overflow-hidden w-[100%] whitespace-nowrap'>
            {recipe.title}
          </p>
          <span className='flex flex-row items-center text-sm md:text-base text-neutral-600 dark:text-neutral-200'>
            <img alt='' src={Clock} className='w-3 h-3 mr-2' />
            {recipe.readyInMinutes} min
          </span>
        </div>
      </div>
    ));
  };

  return (
    <BaseSection customStyle='px-10'>
      <SearchSection />
      {randomRecipes && (
        <div className='w-full flex justify-between flex-row flex-wrap'>
          {renderRecipes()}
        </div>
      )}
    </BaseSection>
  );
}

export default RecipesPage;
