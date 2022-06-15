import React, { FC } from "react";
interface IProps {
  name: string;
  data: string;
}
const StatsLi: FC<IProps> = ({ name, data }) => {
  return (
    <li className="flex flex-col justify-center items-center gap-y-3 p-4 h-28 w-28 bg-slate-400/20 dark:bg-slate-800/50 hover:dark:bg-slate-800/70 hover:bg-slate-400/30 rounded-lg border-4 border-gray-900/10 dark:border-gray-50/10 duration-150">
      <span className="text-lg font-bold uppercase text-slate-600 dark:text-gray-400">
        {name}
      </span>
      <span className="text-xl text-slate-900 dark:text-gray-200 font-mono">
        {data}
      </span>
    </li>
  );
};

export default StatsLi;
