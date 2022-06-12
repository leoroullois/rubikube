import Circle from "./circle";
import Rectangle from "./rectangle";

const Background = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full z-0 dark:bg-neutral-900 to-transparent bg-[url("/patterns/cross.png")] bg-no-repeat bg-cover overflow-hidden'>
      <Circle />
      <Rectangle />
    </div>
  );
};

export default Background;
