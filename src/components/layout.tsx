import Navbar from "@components/navbar";
import Footer from "@components/footer";
import { FC } from "react";

interface IProps {
   children: JSX.Element;
}
const Layout = ({ children }: IProps) => {
   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   );
};

export default Layout;

