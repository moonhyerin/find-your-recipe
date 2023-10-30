import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from '@mui/material';

import BaseSection from '../components/BaseSection';
import SearchSection from '../components/SearchSection';
import Label from '../components/Label';

import Clock from '../assets/clock.png';

import { API_URL, API_HOST, API_KEY } from '../constant';
import { CategoryType, RecipeType, ResultType } from '../types';

function RecipesPage() {
  const [randomRecipes, setRandomRecipes] = useState<RecipeType[]>([]);
  const [searchResult, setSearchResult] = useState<RecipeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      // FIX ME: WRITE FOR TESTING !!!
      const check = await localStorage.getItem('randomRecipes');

      if (check) {
        const data = JSON.parse(check);
        setRandomRecipes(data);
      } else {
        const options = {
          method: 'GET',
          url: `${API_URL}/random`,
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

  const navigate = useNavigate();

  const handleRecipeClick = (recipe: RecipeType | ResultType) => {
    console.log(recipe);

    navigate(`/recipes/${recipe.id}`);
  };

  const renderRecipes = (recipes: RecipeType[]) => {
    return recipes.map((recipe, i) => (
      <div
        key={`${recipe.title}_${i}`}
        className='p-3 my-2 sm:w-[49%] md:w-[32%] lg:w-[24%] xl:w-[19%] bg-white border-2 hover:border-[#ff512e] cursor-pointer'
        onClick={() => handleRecipeClick(recipe)}
      >
        <img alt='' src={recipe.image} />
        <div className='my-2'>
          {recipe.dishTypes.length ? (
            recipe.dishTypes.map(
              (dishType, i) =>
                i < 3 && (
                  <Label
                    key={dishType}
                    value={dishType}
                    customStyle='py-[5px] px-[5px] m-1 !rounded-xl !bg-[#ffe5b4] text-black !text-[10px]'
                  />
                )
            )
          ) : (
            <Label
              key={'no_value'}
              value={'Any'}
              customStyle='py-[5px] px-[5px] m-1 !rounded-xl !bg-[#ffe5b4] text-black !text-[10px]'
            />
          )}
          {recipe.dishTypes.length > 3 && (
            <Tooltip title={recipe.dishTypes.join(',')} placement='bottom'>
              <p className='text-xs'>+{recipe.dishTypes.length - 3}</p>
            </Tooltip>
          )}
        </div>
        <div className='py-2 flex flex-col items-center w-[100%]'>
          <p className='mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50 w-[100%]'>
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

  const searchRecipes = async (search: string, options: CategoryType) => {
    const optionsToApiParams = Object.keys(options).reduce((acc, key) => {
      return { ...acc, [key]: options[key].join(',') };
    }, {});

    const apiOptions = {
      method: 'GET',
      url: `${API_URL}/complexSearch`,
      params: {
        query: search,
        addRecipeInformation: true,
        ...optionsToApiParams,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    try {
      const response = await axios.request(apiOptions);
      console.log(response.data.results);
      setSearchResult(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseSection customStyle='px-10'>
      <SearchSection handleSearch={searchRecipes} />
      {searchResult.length ? (
        <div className='w-full flex justify-between flex-row flex-wrap'>
          {renderRecipes(searchResult)}
        </div>
      ) : (
        <div className='w-full flex justify-between flex-col flex-wrap'>
          <div>
            <h2 className='text-lg md:text-xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
              What do you want to cook today? Get Inspired!
            </h2>
          </div>
          <div className='flex justify-between flex-row flex-wrap'>
            {renderRecipes(randomRecipes)}
          </div>
        </div>
      )}
    </BaseSection>
  );
}

export default RecipesPage;
