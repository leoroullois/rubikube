import Link from "next/link";
import React, { FC } from "react";
import { IoAdd } from "react-icons/io5";
interface IProps {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}
const TimesUl: FC<IProps> = ({ title, children }) => {
  return (
    <ul className="flex flex-row lg:flex-col flex-wrap justify-between items-center gap-5 px-5 py-3 w-auto max-w-full mx-auto my-0">
      {!!title && (
        <h2 className="text-xl font-bold w-full text-left">{title}</h2>
      )}
      {children}
    </ul>
  );
};

export default TimesUl;
