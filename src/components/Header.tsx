import React from 'react';

import Logo from '../assets/chef.png';

function Header() {
  return (
    <div className='flex flex-row justify-between items-center px-4'>
      <div className='flex flex-row items-center'>
        <img className='w-9 h-9 mr-5' alt='' src={Logo}></img>
        <div className='p-5 text-sm'>Home</div>
        <div className='p-5 text-sm'>Recipe</div>
        <div className='p-5 text-sm'>About</div>
      </div>
      <div>
        <input
          type='text'
          placeholder='Wanna cook something?'
          className='p-2 w-[200px] text-sm shadow-md rounded-md border-solid'
        />
        <button className='ml-3 shadow-md text-sm bg-[#ff512e] text-white p-2 rounded-md'>
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
