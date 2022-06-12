import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@components/home/header";
import BlueText from "@components/texts/blue-text";
import RedText from "@components/texts/red-text";
import Canvas from "@components/threejs/canvas";
import Wrapper from "@components/wrapper";

import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Home - RUBYCUBE</title>
      </Head>
      <main className="flex flex-col text-center">
        <Wrapper className="flex-col gap-y-5">
          <>
            <Header />
            <section className="flex flex-col max-w-full md:flex-row gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
              <div className="flex flex-col max-w-full gap-y-5">
                <h3 className="w-full text-xl text-left font-bold">⏰ TIMER</h3>
                <div className="flex flex-row gap-x-5">
                  <div className="w-8 h-1 bg-red-500 rounded-full shadow-sm"></div>
                  <div className="w-16 h-1 bg-red-500 rounded-full shadow-sm"></div>
                </div>
                <p className="text-2xl font-semibold w-96 max-w-full text-left text-gray-900/80 dark:text-gray-100/90">
                  Online Rubik&apos;s cube speedsolving <RedText>timer</RedText>
                  . Register and save your sessions to{" "}
                  <BlueText>see your progress</BlueText>.
                </p>
                <ul className="pl-4 text-left text-lg list-disc w-96">
                  <li>Built-in scrambler</li>
                  <li>Inspection mode</li>
                  <li>Save your sessions</li>
                </ul>
                <p className="text-left text-lg">
                  Great !{" "}
                  <Link href="/timer">
                    <a className="underline hover:text-red-700">Start cubing</a>
                  </Link>{" "}
                  for free.
                </p>
              </div>
              <div className="flex max-w-full">
                <Image
                  src="https://via.placeholder.com/300x400.png?text=Screen+of+the+timer"
                  alt="Timer page"
                  height={300}
                  width={400}
                />
              </div>
            </section>
            <section>
              <h3 className="text-4xl font-bold">ANALYTICS</h3>
              <p>Watch your analytics and see your progress over time</p>
              <ul>
                <li>Averages of 5, 12...</li>
                <li>Graphical display</li>
                <li>View progress over time</li>
              </ul>
            </section>
            <section className="flex flex-row-reverse w-full items-center h-96">
              <div>
                <h3 className="text-4xl font-bold">3D CUBE</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  minima quibusdam voluptate harum soluta veniam consequuntur
                  molestias ipsa recusandae amet unde voluptatem quas! Voluptas
                  debitis deleniti facilis, rerum magni atque.
                </p>
              </div>
              {!!mounted && <Canvas />}
            </section>
          </>
        </Wrapper>
      </main>
    </>
  );
};

export default Home;
