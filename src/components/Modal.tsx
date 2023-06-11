import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
  setIsOpen(isOpen: boolean): void;
  children: React.ReactNode;
};

function Modal({ setIsOpen, children }: PropsType) {
  return (
    <div className='fixed z-50 inset-0 md:hidden'>
      <div
        className='fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 z-10'
        onClick={() => setIsOpen(false)}
      >
        <div className='fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5'>
          <div className='absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'>
            <CloseIcon sx={{ width: 20, height: 20 }} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
