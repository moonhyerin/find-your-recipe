import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from '@mui/material';

import BaseSection from '../components/BaseSection';
import SearchSection from '../components/SearchSection';
import Label from '../components/Label';

import Clock from '../assets/clock.png';

import { API_URL_SEARCH, API_HOST, API_KEY } from '../constant';
import { CategoryType, RandomRecipeType, ResultType } from '../types';

function RecipesPage() {
  const [randomRecipes, setRandomRecipes] = useState<RandomRecipeType[]>([]);
  const [searchResult, setSearchResult] = useState<ResultType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const check = localStorage.getItem('randomRecipes');

      if (check) {
        const data = JSON.parse(check);
        setRandomRecipes(data);
      } else {
        const options = {
          method: 'GET',
          url: API_URL_SEARCH,
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

  const handleRecipeClick = (recipe: RandomRecipeType | ResultType) => {
    console.log(recipe);

    navigate(`/recipe/${recipe.title}`);
  };

  const renderRandomRecipes = () => {
    return randomRecipes.map((recipe) => (
      <div
        key={recipe.title}
        className='p-3 my-2 sm:w-[49%] md:w-[32%] lg:w-[24%] xl:w-[19%] bg-white border-2 hover:border-b-4 hover:border-b-[#ff512e] cursor-pointer'
        onClick={() => handleRecipeClick(recipe)}
      >
        <img alt='' src={recipe.image} />
        <div className='my-2'>
          {recipe.dishTypes.map(
            (dishType, i) =>
              i < 3 && (
                <Label
                  key={dishType}
                  value={dishType}
                  customStyle='m-1 p-1 !rounded-md'
                />
              )
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
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: search,
        ...optionsToApiParams,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    // FIX ME: WRITE FOR TESTING !!!
    // const prevResult = localStorage.getItem('searchResult');
    // if (!prevResult) {
    //   try {
    //     const response = await axios.request(apiOptions);
    //     console.log(response.data);
    //     setSearchResult(response.data.results);
    //     localStorage.setItem(
    //       'searchResult',
    //       JSON.stringify(response.data.results)
    //     );
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   setSearchResult(JSON.parse(prevResult));
    // }
    try {
      const response = await axios.request(apiOptions);
      console.log(response.data);
      setSearchResult(response.data.results);
      // localStorage.setItem(
      //   'searchResult',
      //   JSON.stringify(response.data.results)
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const renderSearchResult = () => {
    return searchResult.map((recipe) => (
      <div
        key={recipe.title}
        className='p-3 my-2 sm:w-[49%] md:w-[32%] lg:w-[24%] xl:w-[19%] bg-white border-2 hover:border-b-4 hover:border-b-[#ff512e] cursor-pointer'
        onClick={() => handleRecipeClick(recipe)}
      >
        <img alt='' src={recipe.image} />
        <div className='py-2 flex flex-col items-center w-[100%]'>
          <p className='mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50 w-[100%]'>
            {recipe.title}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <BaseSection customStyle='px-10'>
      <SearchSection handleSearch={searchRecipes} />
      {searchResult ? (
        <div className='w-full flex justify-between flex-row flex-wrap'>
          {renderSearchResult()}
        </div>
      ) : (
        <div className='w-full flex justify-between flex-row flex-wrap'>
          {renderRandomRecipes()}
        </div>
      )}
    </BaseSection>
  );
}

export default RecipesPage;
