import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";

import { logout } from "@store/slices/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className="flex py-2 px-5 text-slate-200 font-semibold bg-red-500 rounded shadow hover:bg-red-600 duration-100"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
