import Link from "next/link";

import BorderBtn from "@components/buttons/border-btn";
import MainLogo from "@components/logos/main-logo";
import ColorModeIcon from "@components/navbar/color-mode-icon";
import MainLinks from "@components/navbar/main-links";
import Wrapper from "@components/wrapper";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import LogoutBtn from "@components/buttons/logout-btn";
import { IoPersonCircle } from "react-icons/io5";

const NavBar = () => {
   const { isAuthenticated } = useSelector(selectAuth);

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
                  {isAuthenticated ? (
                     <>
                        <LogoutBtn />
                        <Link href='/dashboard'>
                           <a className='flex items-center'>
                              <IoPersonCircle className='text-gray-800 text-5xl' />
                           </a>
                        </Link>
                     </>
                  ) : (
                     <BorderBtn href='/login'>Login</BorderBtn>
                  )}

                  <ColorModeIcon />
               </div>
            </>
         </Wrapper>
      </nav>
   );
};
export default NavBar;

