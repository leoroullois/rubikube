import { FC } from "react";
interface IProps {
  children: string;
}
const BlueText: FC<IProps> = ({ children }) => {
  return (
    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-t from-blue-600 to-blue-700">
      {children}
    </span>
  );
};

export default BlueText;
