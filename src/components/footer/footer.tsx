import CreatedBy from "@components/footer/created-by";
import CreatedByItem from "@components/footer/created-by-item";
import Copyright from "./copyright";

const Footer = () => {
   return (
      <footer className='flex flex-col justify-center items-center gap-y-2 backdrop-blur border-t p-5 shadow-sm black:border-gray-700'>
         <Copyright />
         <CreatedBy>
            <>
               <CreatedByItem name='Léo ROULLOIS' />,{" "}
               <CreatedByItem name='Sanjev SAHENDRAN' />,{" "}
               <CreatedByItem name='Nicolas TADRES' />,{" "}
               <CreatedByItem name='Yoan RODRIGUEZ' />
            </>
         </CreatedBy>
      </footer>
   );
};

export default Footer;

