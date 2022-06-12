import Link from "next/link";
import React, { FC } from "react";

interface IProps {
  children: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  emoji: string;
}
const SecondaryBtn: FC<IProps> = ({ children, href, icon, emoji }) => {
  return (
    <Link href={href}>
      <a className='relative flex items-center justify-between px-8 py-2 border border-gray-500/10 hover:text-gray-50 shadow-xl rounded-full overflow-hidden backdrop-opacity-10 before:absolute before:content-[""] before:bg-gray-200 before:backdrop-blur-3xl before:opacity-5 before:-inset-1 hover:bg-blue-700 hover:duration-100'>
        <span className="text-lg font-bold relative">
          {emoji} <span className="mx-6">{children}</span>
        </span>
        {icon}
      </a>
    </Link>
  );
};

export default SecondaryBtn;
