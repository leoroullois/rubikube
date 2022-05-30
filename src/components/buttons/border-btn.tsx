import Link from "next/link";
import { FC } from "react";

interface IProps {
   children: React.ReactNode;
   href: string;
}

const BorderBtn: FC<IProps> = ({ children, href }) => {
   return (
      <Link href={href}>
         <a className='bg-transparent hover:bg-blue-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-150'>
            {children}
         </a>
      </Link>
   );
};

export default BorderBtn;

