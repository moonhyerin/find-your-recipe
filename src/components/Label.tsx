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
      className={`text-xs inline-block rounded-full ${style} ${
        checked && '!bg-[#ff512e] !text-white'
      }`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default Label;
