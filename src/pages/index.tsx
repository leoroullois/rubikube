import Head from "next/head";

import Wrapper from "@components/wrapper";

import type { NextPage } from "next";
import RedText from "@components/texts/red-text";
import GreenText from "@components/texts/green-text";
import Image from "next/image";
import cube from "@public/logos/cube.svg";
import { IoArrowForward } from "react-icons/io5";
const Home: NextPage = () => {
   return (
      <>
         <Head>
            <title>Home - RUBYCUBE</title>
         </Head>
         <main className='flex flex-col text-center'>
            <Wrapper className='flex-col'>
               <>
                  <header className='flex h-[500px] gap-x-28 flex-wrap justify-between'>
                     <section className='flex flex-col justify-center gap-y-4 w-1/2 text-left'>
                        <h1 className='text-4xl font-bold'>
                           Lorem ipsum <RedText>dolor</RedText> sit amet
                           consectetur adipisicing elit. Error corrupti nulla
                           autem.
                        </h1>
                        <h2 className='text-lg font-bold text-gray-800 dark:text-gray-300'>
                           Lorem ipsum <GreenText>dolor</GreenText> sit amet.
                        </h2>
                        <div className='flex w-full gap-x-6'>
                           <button className='bg-blue-700 w-46 px-5 py-2 shadow-lg rounded-full text-gray-100 hover:bg-blue-800 text-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 hover:duration-100'>
                              Go to timer
                           </button>
                           <button className='relative flex items-center justify-between px-8 hover:text-gray-50 shadow-xl rounded-full overflow-hidden backdrop-opacity-10 before:absolute before:content-[""] before:bg-gray-200 before:backdrop-blur-3xl before:opacity-5 before:-inset-1 hover:bg-blue-700 hover:duration-100'>
                              <span className='text-lg font-bold relative'>
                                 🚀 <span className='mx-6'>Play with AI</span>
                              </span>
                              <IoArrowForward />
                           </button>
                        </div>
                     </section>
                     <section className='flex animate-float'>
                        <Image src={cube} alt="Rubik's cube" width={350} />
                     </section>
                  </header>
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

