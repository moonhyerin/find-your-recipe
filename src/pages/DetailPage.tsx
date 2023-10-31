import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BaseSection from '../components/BaseSection';
import Label from '../components/Label';

import { API_URL, API_HOST, API_KEY } from '../constant';
import { RecipeType, IngredientType, NutritionType } from '../types';

import Clock from '../assets/clock.png';

function DetailPage() {
  const { recipeId } = useParams();
  const [details, setDetails] = useState<RecipeType>();
  const [ingredients, setIngredients] = useState<IngredientType[]>();
  const [nutritions, setNutritions] = useState<NutritionType>();

  // useEffect(() => {

  // }, [details, ingredients]);
  useEffect(() => {
    async function fetchDetail() {
      // FIX ME: WRITE FOR TESTING !!!
      const check = localStorage.getItem('details');
      const ing = localStorage.getItem('ingredients');
      const nut = localStorage.getItem('nutritions');

      if (check && ing && nut) {
        const data = JSON.parse(check);
        setDetails(data);
        setIngredients(JSON.parse(ing));
        setNutritions(JSON.parse(nut));
      } else {
        const options = {
          method: 'GET',
          url: `${API_URL}/${recipeId}/information`,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        };

        const optionsForIngredients = {
          method: 'GET',
          url: `${API_URL}/${recipeId}/ingredientWidget.json`,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        };

        const optionsForNutritions = {
          method: 'GET',
          url: `${API_URL}/${recipeId}/nutritionWidget.json`,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        };

        try {
          const response = await axios.request(options);
          const data = response.data;
          const ingredientsResponse = await axios.request(
            optionsForIngredients
          );
          const nutritionResponse = await axios.request(optionsForNutritions);

          localStorage.setItem('details', JSON.stringify(data));
          localStorage.setItem(
            'ingredients',
            JSON.stringify(ingredientsResponse.data.ingredients)
          );
          localStorage.setItem(
            'nutritions',
            JSON.stringify(nutritionResponse.data)
          );
          setDetails(data);
          setIngredients(ingredientsResponse.data.ingredients);
          setNutritions(nutritionResponse.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchDetail();
  }, [recipeId]);

  const validData = details && ingredients && nutritions;
  if (!validData) return <div>Roading...</div>;

  return (
    <BaseSection>
      <>
        <div className='text-[40px] font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
          {details.title}
        </div>
        <div className='mb-5'>
          {details.dishTypes.map((dishType) => (
            <Label
              key={dishType}
              value={dishType}
              customStyle='text-base p-2 m-1'
            />
          ))}
        </div>
        <div className='mb-5'>
          <span className='flex flex-row items-center text-sm md:text-base font-inter font-normal tracking-[1.2] text-[#5c5c5c]'>
            <img alt='' src={Clock} className='w-3 h-3 mr-2' />
            Total time {details.readyInMinutes} minutes
          </span>
          <span className='flex flex-row items-center text-sm md:text-base font-inter font-normal tracking-[1.2] text-[#5c5c5c]'>
            <img alt='' src={Clock} className='w-3 h-3 mr-2' />
            {details.servings} Servings
          </span>
        </div>
        {/* <div>{details.summary}</div> */}
        <div className='mb-5'>
          <img alt='' src={details.image} />
        </div>
        <div className='mb-5'>
          <div className='text-3xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
            Ingredients
          </div>
          {ingredients?.map((ingredient) => {
            return (
              <div
                key={ingredient.name}
                className='flex flex-row justify-center items-center text-lg font-inter font-medium tracking-[1.2] text-[#5c5c5c] border-b-2'
              >
                <span className='mr-2'>{ingredient.amount.metric.value}</span>
                <span className='mr-2'>{ingredient.amount.metric.unit}</span>
                <span className='font-semibold'>{ingredient.name}</span>
              </div>
            );
          })}
        </div>
        <div className='mb-5'>
          <div className='text-3xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
            Directions
          </div>
          <div className='flex flex-col justify-center items-center text-lg font-inter font-medium tracking-[1.2] text-[#5c5c5c]'>
            {details.instructions.split('. ').map((sentence, i) => (
              <p key={i} className='m-2'>
                {i + 1}. {sentence}
              </p>
            ))}
          </div>
        </div>
        <div className='mb-5 px-5'>
          <div className='text-3xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
            Wine Pairing
          </div>
          <div className='flex flex-row'>
            <div className='text-lg font-inter font-medium tracking-[1.2] text-[#5c5c5c] w-[50%]'>
              {details.winePairing.pairedWines.map((wine) => (
                <p className='mb-3 border-b-2'>- {wine}</p>
              ))}
            </div>
            <div className='text-md font-inter font-medium tracking-[1.2] text-[#5c5c5c] w-[50%]'>
              {details.winePairing.pairingText}
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <div className='text-3xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
            Nutrition
          </div>
          <div className='flex flex-row'>
            <div className='m-2 rounded-full w-32 h-32 border-4 border-[#ffb06b] flex flex-col justify-center font-inter font-medium'>
              <p>{nutritions.calories}</p>
              <p>Calories</p>
            </div>
            <div className='m-2 rounded-full w-32 h-32 bg-[#ffb06b] flex flex-col justify-center font-inter font-medium'>
              <p>{nutritions.carbs}</p>
              <p>Carbs</p>
            </div>
            <div className='m-2 rounded-full w-32 h-32 bg-[#ffb06b] flex flex-col justify-center font-inter font-medium'>
              <p>{nutritions.protein}</p>
              <p>Protein</p>
            </div>
            <div className='m-2 rounded-full w-32 h-32 bg-[#ffb06b] flex flex-col justify-center font-inter font-medium'>
              <p>{nutritions.fat}</p>
              <p>Fat</p>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <div className='text-3xl font-lora font-semibold mb-5 underline decoration-2 decoration-[#ff512e]'>
            Recipe Tags
          </div>
          <div className='flex flex-row justify-center items-center text-lg font-inter font-medium tracking-[1.2]  text-[#5c5c5c]'>
            {details.diets.map((diet, i) => (
              <Label
                key={diet}
                value={`# ${diet}`}
                customStyle='text-base p-2 m-1 !bg-[#ffe5b4] text-black'
              />
            ))}
          </div>
        </div>
      </>
    </BaseSection>
  );
}

export default DetailPage;
