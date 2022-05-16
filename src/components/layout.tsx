import Navbar from "@components/navbar/navbar";
import Footer from "@components/footer/footer";
import Background from "./background/background";
import Head from "next/head";

interface IProps {
   children: JSX.Element;
}
const Layout = ({ children }: IProps) => {
   return (
      <>
         <Head>
            <link rel='icon' href='/logos/cube.svg' />
         </Head>
         <div className='relative flex flex-col h-full w-full z-10'>
            <Navbar />
            {children}
            <Footer />
         </div>
         <Background />
      </>
   );
};

export default Layout;

