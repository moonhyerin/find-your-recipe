import React from 'react';
import BaseSection from '../components/BaseSection';

function AboutPage() {
  return (
    <BaseSection>
      <div className='mb-5'>
        <h2 className='text-lg md:text-xl font-lora font-semibold mb-3 underline decoration-2 decoration-[#ff512e]'>
          Created by
        </h2>
        <p className='mb-2 text-base font-inter font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
          Hyerin Mun
        </p>
      </div>
      <div className='mb-5'>
        <h2 className='text-lg md:text-xl font-lora font-semibold mb-3 underline decoration-2 decoration-[#ff512e]'>
          References
        </h2>
        <p className='mb-2 text-base font-inter font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
          Recipe from Spoonacular api (
          <a
            href='https://spoonacular.com/food-api'
            className='hover:underline hover:decoration-2 hover:decoration-[#ff512e]'
          >
            Link
          </a>
          )
        </p>
      </div>
    </BaseSection>
  );
}

export default AboutPage;
