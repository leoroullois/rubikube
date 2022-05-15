import scss from "@scss/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/main-logo.svg";

const Navbar = () => {
   
   return (
      <nav className={scss.nav}>
         <Link href='/'>
            <a>
               <Image src={logo} alt='Logo' height={60} width={170} />
            </a>
         </Link>
         <span className={scss.links}>
            <Link href='/'>
               <a>Accueil</a>
            </Link>
            <Link href='/algo'>
               <a>Algo</a>
            </Link>
            <Link href='/jouer'>
               <a>Jouer</a>
            </Link>
         </span>
      </nav>
   );
};
export default Navbar;

