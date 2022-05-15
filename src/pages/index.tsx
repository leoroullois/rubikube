import type { NextPage } from "next";
import scss from "@scss/Home.module.scss";
import { Button, useColorMode } from "@chakra-ui/react";

const Home: NextPage = () => {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
      <main className={scss.main}>
         <h1>Rubikube</h1>
         <Button onClick={toggleColorMode}>Toggle dark mode</Button>
      </main>
   );
};

export default Home;