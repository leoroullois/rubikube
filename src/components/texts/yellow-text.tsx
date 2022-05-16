import { FC } from "react";
interface IProps {
   children: string;
}
const YellowText: FC<IProps> = ({ children }) => {
   return (
      <span className='text-gradient bg-gradient-to-t from-yellow-500 to-yellow-700 bg-clip-text'>
         {children}
      </span>
   );
};

export default YellowText;

