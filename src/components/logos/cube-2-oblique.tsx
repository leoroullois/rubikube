import Image from "next/image";
import logo from "@public/logos/cube-2-inline.svg";

const CubeInlineOblique = () => {
   return <Image src={logo} height={50} width={150} alt="Rubik's cube" />;
};

export default CubeInlineOblique;

