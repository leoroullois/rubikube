import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
}
const Spinner = () => {
  return (
    <div
      className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

const AuthBtn: FC<IProps> = ({ children, isLoading }) => {
  return (
    <button
      type="submit"
      className={`w-full h-12 py-2 px-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg ${
        !!isLoading && "cursor-not-allowed"
      }`}
    >
      {!!isLoading ? <Spinner /> : children}
    </button>
  );
};

export default AuthBtn;
