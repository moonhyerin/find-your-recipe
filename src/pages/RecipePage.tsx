import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Section from '../components/Section';
import DetailPage from './DetailPage';
import SearchBar from '../components/SearchBar';

type CategoryType = {
  [key: string]: string;
};

const category: CategoryType = {
  cuisine:
    'african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, latin american',
  diet: 'pescetarian, lacto vegetarian, ovo vegetarian, vegan, paleo, primal, vegetarian',
  intolerances:
    'dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, wheat',
  type: 'main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, drink',
};

function RecipesPage() {
  const [search, setSearch] = useState('');

  useEffect(() => {}, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Search recipes with 'search' value -> move to search result page
      console.log(search);
    }
  };

  return (
    <Section customStyle='min-h-full'>
      {searchParam ? (
        <DetailPage search={searchParam} />
      ) : (
        <>
          <SearchBar
            customStyle='w-2/3'
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div></div>
        </>
        // Object.keys(category).map((key) => (
        //   <div key={`${key}_container`} className='w-[100%] h-1/2 my-10'>
        //     <div key={`${key}_title`} className='text-lg font-bold'>
        //       {key}
        //     </div>
        //     <div
        //       key={`${key}_items`}
        //       className='flex flex-row flex-wrap justify-center p-4'
        //     >
        //       {category[key].split(', ').map((value) => (
        //         <Link
        //           key={value}
        //           to={`/recipes?search=${value}`}
        //           className='m-3 py-2 px-4 bg-[#ff512e] text-white rounded-full cursor-pointer hover:bg-[#ff512e]/[.7]'
        //         >
        //           {value}
        //         </Link>
        //       ))}
        //     </div>
        //   </div>
        // ))
      )}
    </Section>
  );
}

export default RecipesPage;
