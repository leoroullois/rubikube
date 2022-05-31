import { FC } from "react";

interface IProps {
    children: React.ReactNode;
 }

 const AuthBtn: FC<IProps> = ({ children }) => {
    return (
        <button type="submit" className="bg-gray-600/40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{children}</button>
    );
 };
 
 export default AuthBtn;