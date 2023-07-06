import React, { useState } from 'react';

type PropsType = {
  value: string;
  clickable?: boolean;
  paramKey?: string;
  customStyle?: string;
  handleChecked?: (key: string, value: string) => void;
};

function Label({
  clickable,
  paramKey,
  value,
  customStyle,
  handleChecked,
}: PropsType) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (paramKey && handleChecked) {
      setChecked(!checked);
      handleChecked(paramKey, value);
    }
  };

  const style = clickable
    ? `bg-slate-400/10 text-slate-500 cursor-pointer ${customStyle}`
    : `!bg-[#ff512e] text-white ${customStyle}`;

  return (
    <div
      className={`font-inter text-xs font-medium uppercase tracking-widest inline-block rounded-full py-[10px] px-[20px] ${style} ${
        checked && '!bg-[#ff512e] !text-white'
      }`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default Label;
