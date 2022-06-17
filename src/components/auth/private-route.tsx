import { selectAuth } from "@store/selectors";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";

interface IProps {
  children: JSX.Element[] | JSX.Element;
}
const PrivateRoute: FC<IProps> = ({ children }) => {
  const router = useRouter();

  const auth = useSelector(selectAuth);
  if (typeof window !== "undefined" && auth.isAuthenticated === false) {
    router.push("/login");
  }
  if (auth.user.email === "") {
    return <Loading />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
