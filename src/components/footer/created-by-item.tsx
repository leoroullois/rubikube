import React, { FC } from "react";

interface IProps {
   name: string;
}
const CreatedByItem: FC<IProps> = ({ name }) => {
   return (
      <span className='text-blue-500 hover:text-blue-600 cursor-pointer font-medium'>
         {name}
      </span>
   );
};

export default CreatedByItem;

