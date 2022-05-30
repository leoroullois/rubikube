import React, { FC } from "react";

interface IProps {
   kbd: string;
   children: string;
}
const KbdBtn: FC<IProps> = ({ children, kbd }) => {
   return (
      <button
         type='button'
         role='button'
         className='flex items-center h-8 bg-slate-800 active:ring hover:bg-slate-900 gap-x-2 px-3 rounded-lg shadow-lg'
      >
         <kbd className='flex justify-center items-center bg-slate-400/20 rounded w-8 font-bold'>
            {kbd}
         </kbd>
         <div className='flex h-full w-px bg-slate-400/20'></div>
         <span className='font-bold'>{children}</span>
      </button>
   );
};

export default KbdBtn;

