import React, { useState } from 'react';

type PropsType = {
  message: string;
  handleChecked?: (value: string) => void;
};

function Label({ message, handleChecked }: PropsType) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);

    if (handleChecked) handleChecked(message);
  };

  return (
    <div
      className={`text-xs inline-block mr-2 my-1 py-2 px-2 rounded-full cursor-pointer ${
        checked ? 'bg-[#ff512e] text-white' : 'bg-slate-400/10 text-slate-500'
      }`}
      onClick={handleClick}
    >
      {message}
    </div>
  );
}

export default Label;
