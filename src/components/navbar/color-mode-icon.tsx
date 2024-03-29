import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

const ColorModeIcon = () => {
   const { systemTheme, theme, setTheme } = useTheme();

   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const renderThemeChanger = () => {
      if (!mounted) return null;
      const currentTheme = theme === "system" ? systemTheme : theme;

      if (currentTheme === "dark") {
         return (
            <FiSun
               className='w-8 h-8 text-gray-100'
               role='button'
               onClick={() => setTheme("light")}
            />
         );
      } else {
         return (
            <BsMoonStars
               className='w-7 h-7 text-gray-900 '
               role='button'
               onClick={() => setTheme("dark")}
            />
         );
      }
   };
   return <>{renderThemeChanger()}</>;
};

export default ColorModeIcon;

