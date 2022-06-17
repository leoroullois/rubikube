import { useTimes } from "@hooks/use-time";
import { toggleDNF, togglePenalty } from "@store/slices/solves";
import React, { FC, MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { ITime } from "src/typescript/types";
interface IProps {
  time: ITime | null;
  ao5: string;
  ao12: string;
}
const TimesLi: FC<IProps> = ({ time, ao5, ao12 }) => {
  const dispatch = useDispatch();

  const handleDNF: MouseEventHandler = () => {
    dispatch(toggleDNF(time?.id ?? ""));
  };
  const handlePenalty: MouseEventHandler = () => {
    dispatch(togglePenalty(time?.id ?? ""));
  };
  const { formatTime } = useTimes();

  return (
    <li className="flex flex-col justify-center items-center gap-y-3 p-4 w-full sm:w-40 bg-slate-400/20 dark:bg-slate-800/50 hover:dark:bg-slate-800/70 hover:bg-slate-400/30 rounded-lg border-4 border-gray-900/10 dark:border-gray-50/10 duration-150">
      <p className="text-green-500 font-mono">{formatTime(time?.time ?? 0)}</p>
      <p className="w-full text-center font-mono">AO5 : {ao5}</p>
      <p className="w-full text-center font-mono">AO12 : {ao12}</p>
      <p className="flex flex-row justify-between gap-x-5 w-full">
        <button
          onClick={handleDNF}
          className="flex items-center justify-center w-14 px-3 py-1 bg-red-600 rounded hover:bg-red-700 duration-150 font-semibold"
        >
          +2
        </button>
        <button
          onClick={handlePenalty}
          className="flex items-center justify-center w-14 px-3 py-1 bg-red-600 rounded hover:bg-red-700 duration-150 font-semibold"
        >
          DNF
        </button>
      </p>
    </li>
  );
};

export default TimesLi;
