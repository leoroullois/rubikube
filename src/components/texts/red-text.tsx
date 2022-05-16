import { FC } from "react";
interface IProps {
   children: string;
}
const RedText: FC<IProps> = ({ children }) => {
   return (
      <span className='text-gradient bg-gradient-to-t from-red-600 to-red-700 bg-clip-text'>
         {children}
      </span>
   );
};

export default RedText;

