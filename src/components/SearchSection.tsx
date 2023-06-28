import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import SearchBar from './SearchBar';
import Label from './Label';

import { CategoryType } from '../types';

type PropsType = {
  handleSearch: (search: string, options: CategoryType) => void;
};

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

function SearchSection({ handleSearch }: PropsType) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<CategoryType>({});

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(search, options);
    }
  };

  const handleClick = () => {
    handleSearch(search, options);
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

  const renderMoreOptions = () => {
    return (
      <div className=' text-right'>
        <div className=' text-base cursor-pointer' onClick={handleOpen}>
          More options
          <ExpandMoreIcon sx={{ width: 15, height: 15 }} />
        </div>
        <Collapse in={open} timeout={500} component='div' className='py-2'>
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
                    clickable
                    value={value}
                    customStyle='ml-2 my-1 py-2 px-2'
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
    <>
      <div className='flex flex-row justify-between w-full py-2'>
        <SearchBar
          customStyle='w-full mr-3'
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type='button'
          value='Search'
          className='text-base bg-[#ff512e] rounded-lg px-5 text-white font-normal'
          onClick={handleClick}
        />
      </div>
      {renderMoreOptions()}
    </>
  );
}

export default SearchSection;
