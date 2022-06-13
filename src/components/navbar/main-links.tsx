import Link from "next/link";
import React from "react";

const MainLinks = () => {
  const style =
    "text-gray-800 hover:text-red-800 dark:text-gray-100 dark:hover:text-gray-300 hover:duration-100";

  return (
    <div className="flex gap-x-8 text-lg font-bold">
      <Link href="/">
        <a className={style}>Home</a>
      </Link>
      <Link href="/timer">
        <a className={style}>Timer</a>
      </Link>
      <Link href="/explore">
        <a className={style}>Explore</a>
      </Link>
    </div>
  );
};

export default MainLinks;
