import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";

import MainBtn from "@components/buttons/main-btn";
import SecondaryBtn from "@components/buttons/secondary-btn";
import GreenText from "@components/texts/green-text";
import cube from "@public/logos/cube.svg";

const Header = () => {
  return (
    <header className="flex flex-row gap-x-28 gap-y-12 py-5 w-full flex-wrap justify-between">
      <section className="flex flex-col justify-center gap-y-4 w-full lg:w-1/2 text-left">
        <h1 className="text-4xl font-bold">
          RubyCube is the best place to <GreenText>learn</GreenText> and{" "}
          <GreenText>improve</GreenText> at rubik&apos;s cube.
        </h1>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-300">
          Advanced cube timer with analytics, 3D real time Rubik&apos;s Cube for
          experimentations.
        </h2>
        <div className="flex flex-col gap-y-5 sm:flex-row w-full gap-x-6">
          <MainBtn href="/timer">Start cubing</MainBtn>
          <SecondaryBtn href="/explore" emoji="🚀" icon={<IoArrowForward />}>
            Start exploring
          </SecondaryBtn>
        </div>
      </section>
      <section className="flex justify-center w-full lg:w-fit animate-float">
        <Image src={cube} alt="Rubik's cube" width={350} />
      </section>
    </header>
  );
};

export default Header;
