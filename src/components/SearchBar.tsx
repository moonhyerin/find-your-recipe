import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
  placeholder?: string;
  customStyle?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function SearchBar(props: PropsType) {
  const { placeholder, customStyle, value, onChange, onKeyDown } = props;

  const baseStyle =
    'font-inter flex flex-row p-3 text-sm rounded-lg bg-slate-400/10 hover:bg-slate-400/20';

  return (
    <div className={customStyle ? `${baseStyle} ${customStyle}` : baseStyle}>
      <SearchIcon sx={{ width: 20, height: 20 }} />
      <input
        type='text'
        className='font-inter tracking-[1.2] ml-2 w-full bg-transparent border-none focus:outline-none'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default SearchBar;
