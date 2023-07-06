import React from 'react';

import Clock from '../assets/clock.png';
import { RecipeType } from '../types';

type PropsType = {
  recipe: RecipeType;
  handleClick: (recipeId: number) => void;
};

const Card = (props: PropsType) => {
  const { recipe, handleClick } = props;

  const sendRecipeId = () => {
    handleClick(recipe.id);
  };

  return (
    <div
      className='w-[100%] md:w-1/3 h-[30%] md:h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] m-2 cursor-pointer'
      onClick={sendRecipeId}
    >
      <div
        className='relative overflow-hidden h-[70%]'
        data-te-ripple-init
        data-te-ripple-color='light'
      >
        <img
          className='rounded-lg w-[100%] h-[100%] object-fill'
          src={recipe.image}
          alt=''
        />
      </div>
      <div className='p-6 flex flex-col items-center w-[100%]'>
        <p className='mb-2 text-lg font-lora font-semibold leading-tight text-neutral-800 text-ellipsis overflow-hidden w-[100%] whitespace-nowrap'>
          {recipe.title}
        </p>
        <span className='flex flex-row items-center text-sm md:text-base font-inter font-normal tracking-[1.2] text-[#5c5c5c]'>
          <img alt='' src={Clock} className='w-3 h-3 mr-2' />
          {recipe.readyInMinutes} minutes
        </span>
      </div>
    </div>
  );
};

export default Card;
