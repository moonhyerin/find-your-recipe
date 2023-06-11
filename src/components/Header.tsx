import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../assets/chef.png';

function Header() {
  const [search, setSearch] = useState('');

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
    <div className='flex flex-row justify-between items-center p-4 md:px-4 md:py-0'>
      <div className='flex flex-row justify-center items-center'>
        <img className='w-9 h-9' alt='' src={Logo}></img>
        <div className='md:flex md:flex-row md:items-center hidden'>
          <div className='p-5 text-sm'>Home</div>
          <div className='p-5 text-sm'>Recipe</div>
          <div className='p-5 text-sm'>About</div>
        </div>
      </div>
      <div className='block md:hidden'>
        <MenuIcon sx={{ width: 30, height: 30 }} />
      </div>
      <div className='hidden md:block'>
        <input
          type='text'
          placeholder='Wanna cook something?'
          className='p-2 w-[200px] text-sm shadow-md rounded-md border-solid'
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Header;
