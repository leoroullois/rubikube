import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@components/home/header";
import BlueText from "@components/texts/blue-text";
import RedText from "@components/texts/red-text";
import Wrapper from "@components/wrapper";

import type { NextPage } from "next";
import Link from "next/link";
import GreenText from "@components/texts/green-text";
import Canvas from "@components/threejs/canvas";
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
            <div className="flex flex-col gap-y-8 mb-8">
              <section className="flex flex-col max-w-full md:flex-row gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
                <div className="flex flex-col max-w-full gap-y-5">
                  <h3 className="w-full text-xl text-left font-bold">
                    ⏰ TIMER
                  </h3>
                  <div className="flex flex-row gap-x-5">
                    <div className="w-8 h-1 bg-blue-500 rounded-full shadow-sm"></div>
                    <div className="w-16 h-1 bg-blue-500 rounded-full shadow-sm"></div>
                  </div>
                  <p className="text-2xl font-semibold w-96 max-w-full text-left text-gray-900/80 dark:text-gray-100/90">
                    Online Rubik&apos;s cube speedsolving{" "}
                    <RedText>timer</RedText>. Register and save your sessions to{" "}
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
                      <a className="underline hover:text-red-700">
                        Start cubing
                      </a>
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
              <section className="flex flex-col max-w-full md:flex-row-reverse gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
                <div className="flex flex-col max-w-full gap-y-5">
                  <h3 className="w-full text-xl text-left font-bold">
                    📊 ANALYTICS
                  </h3>
                  <div className="flex flex-row gap-x-5">
                    <div className="w-8 h-1 bg-green-500 rounded-full shadow-sm"></div>
                    <div className="w-16 h-1 bg-green-500 rounded-full shadow-sm"></div>
                  </div>
                  <p className="text-2xl font-semibold w-96 max-w-full text-left text-gray-900/80 dark:text-gray-100/90">
                    Watch your <RedText>analytics</RedText> and see your{" "}
                    <GreenText>progress</GreenText> over time
                  </p>
                  <ul className="pl-4 text-left text-lg list-disc w-96">
                    <li>Averages of 5, 12...</li>
                    <li>Graphical display</li>
                    <li>View progress over time</li>
                  </ul>
                  <p className="text-left text-lg">
                    Cool !{" "}
                    <Link href="/timer">
                      <a className="underline hover:text-red-700">
                        Create an account
                      </a>
                    </Link>{" "}
                    and start cubing.
                  </p>
                </div>
                <div className="flex max-w-full">
                  <Image
                    src="https://via.placeholder.com/300x400.png?text=Screen+of+the+analytics"
                    alt="Timer page"
                    height={300}
                    width={400}
                  />
                </div>
              </section>
              <section className="flex flex-col max-w-full md:flex-row gap-x-5 gap-y-5 justify-evenly items-center p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-lg">
                <div className="flex flex-col max-w-full gap-y-5">
                  <h3 className="w-full text-xl text-left font-bold">
                    🚀 3D CUBE
                  </h3>
                  <div className="flex flex-row gap-x-5">
                    <div className="w-8 h-1 bg-blue-500 rounded-full shadow-sm"></div>
                    <div className="w-16 h-1 bg-blue-500 rounded-full shadow-sm"></div>
                  </div>
                  <p className="text-2xl font-semibold w-96 max-w-full text-left text-gray-900/80 dark:text-gray-100/90">
                    Scramble your cube and watch it in <RedText>3D</RedText>.
                    Then, solve it or ask our <BlueText>algorithm</BlueText> to
                    solve it for you.
                  </p>
                  <ul className="pl-4 text-left text-lg list-disc w-96">
                    <li>Scramble, solve</li>
                    <li>Experiment</li>
                    <li>Visualize</li>
                  </ul>
                  <p className="text-left text-lg">
                    Waw !{" "}
                    <Link href="/explore">
                      <a className="underline hover:text-red-700">
                        Start exploring
                      </a>
                    </Link>{" "}
                  </p>
                </div>
                <div className="flex max-w-full h-full">
                  {!!mounted && <Canvas />}
                </div>
              </section>
            </div>
          </>
        </Wrapper>
      </main>
    </>
  );
};

export default Home;
