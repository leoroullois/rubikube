import React, { FC } from "react";

interface IProps {
   name: string;
}
const CreatedByItem: FC<IProps> = ({ name }) => {
   return (
      <span className='text-red-600 hover:text-red-700 cursor-pointer font-medium'>
         {name}
      </span>
   );
};

export default CreatedByItem;

