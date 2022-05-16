import React, { FC } from "react";
interface IProps {
   children: JSX.Element;
}
const CreatedBy: FC<IProps> = ({ children }) => {
   return <p>Created by {children}</p>;
};

export default CreatedBy;

