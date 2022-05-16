import Image from "next/image";
import logo from "@public/logos/cube.svg";
const Cube = () => {
   return <Image src={logo} height={50} width={150} alt="Flat Rubik's cube" />;
};

export default Cube;

