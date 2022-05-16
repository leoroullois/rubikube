import { FC } from "react";
interface IProps {
   children: string;
}
const GreenText: FC<IProps> = ({ children }) => {
   return (
      <span className='text-gradient bg-gradient-to-t from-green-600 to-green-700 bg-clip-text'>
         {children}
      </span>
   );
};

export default GreenText;

