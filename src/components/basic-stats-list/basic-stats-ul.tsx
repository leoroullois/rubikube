import React, { FC } from "react";
interface IProps {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}
const BasicStatsUl: FC<IProps> = ({ children, title }) => {
  return (
    <ul className="flex flex-row flex-wrap justify-around items-center gap-3 px-5 py-3 w-full max-w-full bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
      {!!title && (
        <li className="w-full font-semibold text-xl text-left">{title}</li>
      )}
      {children}
    </ul>
  );
};

export default BasicStatsUl;
