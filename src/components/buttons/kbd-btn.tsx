import { Moves } from "@lib/cubes/Moves";
import { selectCube } from "@store/selectors";
import {
   makeRotateGroup,
   resetCurrRotate,
   setCurrMove,
} from "@store/slices/cube";
import React, { FC, MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
   kbd: Moves;
}
const KbdBtn: FC<IProps> = ({ kbd }) => {
   const dispatch = useDispatch();
   const { currMove } = useSelector(selectCube);

   const mapMoves = (move: Moves): string => {
      if (move === Moves.L || move === Moves.Li || move === Moves.L2) {
         return "Left";
      } else if (move === Moves.R || move === Moves.Ri || move === Moves.R2) {
         return "Right";
      } else if (move === Moves.F || move === Moves.Fi || move === Moves.F2) {
         return "Front";
      } else if (move === Moves.B || move === Moves.Bi || move === Moves.B2) {
         return "Back";
      } else if (move === Moves.U || move === Moves.Ui || move === Moves.U2) {
         return "Up";
      } else if (move === Moves.D || move === Moves.Di || move === Moves.D2) {
         return "Down";
      }
      return "";
   };

   const handleClick: MouseEventHandler = (e) => {
      if (!currMove) {
         dispatch(resetCurrRotate());
         dispatch(setCurrMove(kbd));
         dispatch(makeRotateGroup(kbd));
      }
   };

   return (
      <button
         type='button'
         role='button'
         className='flex items-center h-8 dark:bg-slate-800 active:ring hover:bg-slate-900/10 dark:hover:bg-slate-900 gap-x-2 px-3 rounded-lg shadow-lg'
         onClick={handleClick}
      >
         <kbd className='flex justify-center items-center bg-slate-400/20 dark:bg-slate-400/20 rounded w-8 font-bold'>
            {kbd}
         </kbd>
         <div className='flex h-full w-px bg-slate-400/70 dark:bg-slate-400/20'></div>
         <span className='font-bold'>{mapMoves(kbd)}</span>
      </button>
   );
};

export default KbdBtn;

