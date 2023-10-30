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
    <div className='flex flex-row justify-between items-center p-5 md:px-8 md:py-2'>
      <div className='flex flex-row justify-center items-center'>
        <Link to='/'>
          <img className='w-9 h-9 mr-5' alt='' src={Logo}></img>
        </Link>
        <div className='block'>
          <SearchBar
            placeholder='Search recipes'
            customStyle='w-full md:w-[200px]'
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className='md:flex md:flex-row md:items-center hidden text-base font-inter font-medium tracking-[1.2] text-right text-[#5c5c5c]'>
        <div className='py-5 pl-5'>
          <Link className='hover:text-[#ff512e]' to='/'>
            Home
          </Link>
        </div>
        <div className='py-5 pl-5'>
          <Link className='hover:text-[#ff512e]' to='/recipes'>
            Recipes
          </Link>
        </div>
        <div className='py-5 pl-5'>
          <Link className='hover:text-[#ff512e]' to='/about'>
            About
          </Link>
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
          <ul className='space-y-6 text-start text-base font-inter font-medium tracking-[1.2] text-[#5c5c5c]'>
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
    </div>
  );
}

export default Header;
