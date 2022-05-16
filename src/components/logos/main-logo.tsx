import Image from "next/image";
import React from "react";
import logo from "@public/logos/main-logo.svg";

const MainLogo = () => {
   return <Image src={logo} height={50} width={150} alt="Rubik's cube" />;
};

export default MainLogo;

