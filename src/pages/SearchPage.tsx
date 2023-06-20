import React, { useState } from 'react';
import axios from 'axios';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import BaseSection from '../components/BaseSection';
import SearchBar from '../components/SearchBar';
import Label from '../components/Label';

import { CategoryType, ResultType } from '../types';

const category: CategoryType = {
  cuisine: [
    'african',
    'chinese',
    'japanese',
    'korean',
    'vietnamese',
    'thai',
    'indian',
    'british',
    'irish',
    'french',
    'italian',
    'mexican',
    'spanish',
    'middle eastern',
    'jewish',
    'american',
    'cajun',
    'southern',
    'greek',
    'german',
    'nordic',
    'eastern european',
    'caribbean',
    'latin american',
  ],
  diet: [
    'pescetarian',
    'lacto vegetarian',
    'ovo vegetarian',
    'vegan',
    'paleo',
    'primal',
    'vegetarian',
  ],
  intolerances: [
    'dairy',
    'egg',
    'gluten',
    'peanut',
    'sesame',
    'seafood',
    'shellfish',
    'soy',
    'sulfite',
    'tree nut',
    'wheat',
  ],
  type: [
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'drink',
  ],
};

function SearchPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<CategoryType>({});
  const [searchResult, setSearchResult] = useState<ResultType[]>([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Search recipes with 'search' value -> move to search result page
      searchRecipe();
    }
  };

  const searchRecipe = async () => {
    const optionsToApiParams = Object.keys(options).reduce((acc, key) => {
      return { ...acc, [key]: options[key].join(',') };
    }, {});

    const apiOptions = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
      params: {
        query: search,
        number: '10',
        ...optionsToApiParams,
      },
      headers: {
        'X-RapidAPI-Key': '4d07f0b722msh46c43b1c5cb02cfp19e428jsn4430ada357ab',
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    // FIX ME: WRITE FOR TESTING !!!
    const prevResult = localStorage.getItem('searchResult');
    if (!prevResult) {
      try {
        const response = await axios.request(apiOptions);
        console.log(response.data);
        setSearchResult(response.data.results);
        localStorage.setItem(
          'searchResult',
          JSON.stringify(response.data.results)
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResult(JSON.parse(prevResult));
    }
  };

  const handleSetOptions = (paramKey: string, paramValue: string) => {
    let updatedValue = {};

    if (Object.keys(options).find((key) => key === paramKey)) {
      const optionsByKey = options[paramKey];

      if (optionsByKey.find((value) => value === paramValue)) {
        updatedValue = {
          [paramKey]: optionsByKey.filter((option) => option !== paramValue),
        };
      } else {
        updatedValue = { [paramKey]: optionsByKey.concat(paramValue) };
      }
    } else {
      updatedValue = { [paramKey]: [paramValue] };
    }

    setOptions((options) => ({
      ...options,
      ...updatedValue,
    }));
  };

  const renderCategory = () => {
    return (
      <div className='text-left p-5'>
        <div
          className='font-bold text-base cursor-pointer'
          onClick={handleOpen}
        >
          More options
          <ExpandMoreIcon sx={{ width: 15, height: 15 }} />
        </div>
        <Collapse
          in={open}
          timeout={500}
          component='div'
          className='w-full py-2'
        >
          {Object.keys(category).map((key, i) => (
            <div
              key={key}
              className='text-sm flex flex-col border-dashed border-b-2 py-3'
            >
              {key}
              <div>
                {category[key].map((value) => (
                  <Label
                    key={value}
                    paramKey={key}
                    value={value}
                    handleChecked={handleSetOptions}
                  />
                ))}
              </div>
            </div>
          ))}
        </Collapse>
      </div>
    );
  };

  return (
    <BaseSection customStyle='!justify-start'>
      <>
        <SearchBar
          customStyle='w-2/3 my-2'
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {renderCategory()}
      </>
    </BaseSection>
  );
}

export default SearchPage;
