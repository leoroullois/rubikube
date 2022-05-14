import type { NextPage } from "next";
import scss from "@scss/Home.module.scss";
import Image from "next/image";
import logo from "@public/logo.png";
const Home: NextPage = () => {
   return (
      <main className={scss.main}>
         <h1>Rubikube</h1>
         <Image src={logo} alt='Logo' height={264} width={830} />

      </main>
   );
};

export default Home;

