import Link from "next/link";

import SignUp from "@components/buttons/border-btn";
import MainLogo from "@components/logos/main-logo";
import ColorModeIcon from "@components/navbar/color-mode-icon";
import MainLinks from "@components/navbar/main-links";
import Wrapper from "@components/wrapper";

const NavBar = () => {
   return (
      <nav className='h-14 shadow-sm border-b-2 dark:border-gray-700 backdrop-blur-sm'>
         <Wrapper className='h-14 flex-row items-center justify-between'>
            <>
               <Link href='/'>
                  <a>
                     <MainLogo />
                  </a>
               </Link>
               <MainLinks />
               <div className='flex items-center gap-x-5'>
                  <SignUp href='/login'>Login</SignUp>
                  <ColorModeIcon />
               </div>
            </>
         </Wrapper>
      </nav>
   );
};
export default NavBar;

