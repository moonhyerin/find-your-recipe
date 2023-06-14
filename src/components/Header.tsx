import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../assets/chef.png';

import Modal from './Modal';
import SearchBar from './SearchBar';

function Header() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const onSideMenuClick = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleModalOpen = (isOpen: boolean) => {
    setSideMenuOpen(isOpen);
  };

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
          <div className='p-5 text-sm'>
            <Link className='hover:text-[#ff512e]' to='/'>
              Home
            </Link>
          </div>
          <div className='p-5 text-sm'>
            <Link className='hover:text-[#ff512e]' to='/recipes'>
              Recipes
            </Link>
          </div>
          <div className='p-5 text-sm'>
            <Link className='hover:text-[#ff512e]' to='/about'>
              About
            </Link>
          </div>
        </div>
      </div>
      <div
        className='flex flex-col items-end md:hidden cursor-pointer'
        onClick={onSideMenuClick}
      >
        <MenuIcon sx={{ width: 30, height: 30 }} />
      </div>
      {sideMenuOpen && (
        <Modal setIsOpen={handleModalOpen}>
          <ul className='space-y-6 text-start'>
            <li>
              <Link className='hover:text-[#ff512e]' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='hover:text-[#ff512e]' to='/recipes'>
                Recipes
              </Link>
            </li>
            <li>
              <Link className='hover:text-[#ff512e]' to='/about'>
                About
              </Link>
            </li>
          </ul>
        </Modal>
      )}
      <div className='hidden md:block'>
        <SearchBar
          placeholder='Wanna cook something?'
          customStyle='w-[200px]'
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Header;
