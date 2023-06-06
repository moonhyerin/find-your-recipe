import React from 'react';

type PropsType = {
  children: React.ReactNode;
  customStyle?: string;
};

function Section({ customStyle, children }: PropsType) {
  const customClass = customStyle
    ? `flex flex-col justify-center items-center w-full h-full ${customStyle}`
    : 'flex flex-col justify-center items-center w-full h-full';

  return <div className={customClass}>{children}</div>;
}

export default Section;
