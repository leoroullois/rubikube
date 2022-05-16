import { FC } from "react";
interface IProps {
   children: string;
}
const Indigo: FC<IProps> = ({ children }) => {
   return (
      <span className='text-gradient bg-gradient-to-t from-indigo-600 to-indigo-700 bg-clip-text'>
         {children}
      </span>
   );
};

export default Indigo;

