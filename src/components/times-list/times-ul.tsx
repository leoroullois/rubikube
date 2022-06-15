import Link from "next/link";
import React, { FC } from "react";
import { IoAdd } from "react-icons/io5";
interface IProps {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}
const TimesUl: FC<IProps> = ({ title, children }) => {
  return (
    <ul className="flex flex-row flex-wrap justify-between items-center gap-3 px-5 py-3 w-full bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg xl:h-full">
      {!!title && (
        <h2 className="text-xl font-bold w-full text-left">{title}</h2>
      )}
      {children}
      <Link href="/dashboard">
        <a className="flex flex-row items-center justify-cente p-2 bg-blue-500 rounded hover:bg-blue-600 duration-150">
          <IoAdd className="text-2xl font-bold" />
        </a>
      </Link>
    </ul>
  );
};

export default TimesUl;
