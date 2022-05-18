import Head from "next/head";
import Header from "@components/home/header";
import Wrapper from "@components/wrapper";

import type { NextPage } from "next";
const Home: NextPage = () => {
   return (
      <>
         <Head>
            <title>Home - RUBYCUBE</title>
         </Head>
         <main className='flex flex-col text-center'>
            <Wrapper className='flex-col'>
               <>
                  <Header />
                  <section>
                     <h3>Section 1</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In, minima quibusdam voluptate harum soluta veniam
                        consequuntur molestias ipsa recusandae amet unde
                        voluptatem quas! Voluptas debitis deleniti facilis,
                        rerum magni atque.
                     </p>
                  </section>
                  <section>
                     <h3>Section 2</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In, minima quibusdam voluptate harum soluta veniam
                        consequuntur molestias ipsa recusandae amet unde
                        voluptatem quas! Voluptas debitis deleniti facilis,
                        rerum magni atque.
                     </p>
                  </section>
                  <section>
                     <h3>Section 3</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In, minima quibusdam voluptate harum soluta veniam
                        consequuntur molestias ipsa recusandae amet unde
                        voluptatem quas! Voluptas debitis deleniti facilis,
                        rerum magni atque.
                     </p>
                  </section>
               </>
            </Wrapper>
         </main>
      </>
   );
};

export default Home;

