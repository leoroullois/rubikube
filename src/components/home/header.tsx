import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";

import MainBtn from "@components/buttons/main-btn";
import SecondaryBtn from "@components/buttons/secondary-btn";
import GreenText from "@components/texts/green-text";
import RedText from "@components/texts/red-text";
import cube from "@public/logos/cube.svg";

const Header = () => {
   return (
      <header className='flex h-[500px] gap-x-28 flex-wrap justify-between'>
         <section className='flex flex-col justify-center gap-y-4 w-1/2 text-left'>
            <h1 className='text-4xl font-bold'>
               Lorem ipsum <RedText>dolor</RedText> sit amet consectetur
               adipisicing elit. Error corrupti nulla autem.
            </h1>
            <h2 className='text-lg font-bold text-gray-800 dark:text-gray-300'>
               Lorem ipsum <GreenText>dolor</GreenText> sit amet.
            </h2>
            <div className='flex w-full gap-x-6'>
               <MainBtn href='/timer'>Speed cubing</MainBtn>
               <SecondaryBtn href='/play' emoji='🚀' icon={<IoArrowForward />}>
                  Play with AI
               </SecondaryBtn>
            </div>
         </section>
         <section className='flex animate-float'>
            <Image src={cube} alt="Rubik's cube" width={350} />
         </section>
      </header>
   );
};

export default Header;

