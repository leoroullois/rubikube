import React, { FC } from "react";
interface IProps {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}
const StatsUl: FC<IProps> = ({ children, title }) => {
  return (
    <ul className="flex flex-row flex-wrap justify-around lg:flex-col items-center gap-3 px-5 py-3 max-w-full bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg  overflox-auto">
      {!!title && (
        <li className="font-semibold text-xl text-left w-full lg:w-auto">
          {title}
        </li>
      )}
      {children}
    </ul>
  );
};

export default StatsUl;
