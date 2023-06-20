import React, { useState } from 'react';

type PropsType = {
  paramKey?: string;
  value: string;
  handleChecked?: (key: string, value: string) => void;
};

function Label({ paramKey, value, handleChecked }: PropsType) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);

    if (paramKey && handleChecked) handleChecked(paramKey, value);
  };

  return (
    <div
      className={`text-xs inline-block mr-2 my-1 py-2 px-2 rounded-full cursor-pointer ${
        checked ? 'bg-[#ff512e] text-white' : 'bg-slate-400/10 text-slate-500'
      }`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default Label;
