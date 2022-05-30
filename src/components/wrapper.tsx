import React, { FC } from "react";

interface IProps {
   children: JSX.Element | JSX.Element[];
   className?: string;
}
const Wrapper: FC<IProps> = ({ children, className }) => {
   return (
      <div className={`flex my-0 mx-auto w-11/12 max-w-6xl ${className}`}>
         {children}
      </div>
   );
};

export default Wrapper;

