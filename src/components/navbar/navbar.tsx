import SignUp from '@components/buttons/sign-up-button';
import Link from 'next/link';

import MainLogo from '../logos/main-logo';
import Wrapper from '../wrapper';
import ColorModeIcon from './color-mode-icon';
import MainLinks from './main-links';

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
               <SignUp href='/timer'>Sign Up</SignUp>
               <ColorModeIcon />
            </>
         </Wrapper>
      </nav>
   );
};
export default NavBar;

