import Link from "next/link";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  href: string;
}
const MainBtn: FC<IProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="bg-blue-700 text-center px-8 py-2 shadow-lg rounded-full text-gray-100 hover:bg-blue-800 text-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 hover:duration-100">
        {children}
      </a>
    </Link>
  );
};

export default MainBtn;
