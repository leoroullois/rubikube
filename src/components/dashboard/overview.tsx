import { useTimes } from "@hooks/use-time";
import { selectSolves } from "@store/selectors";
import React, { FC } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { HiHashtag } from "react-icons/hi";
import { IoTrophy } from "react-icons/io5";
import { useSelector } from "react-redux";

interface IProps {
  singlePb: number;
  totalSolves: number;
  timeSpentCubing: number;
}

const Overview: FC = () => {
  const { formatTime } = useTimes();
  const { times } = useSelector(selectSolves);

  const singlePb = Math.min(...times.map((t) => t.time));
  const totalSolves = times.length;
  const timeSpentCubing = times.reduce((acc, curr) => acc + curr.time, 0);

  return (
    <section className="flex flex-row flex-wrap justify-center gap-4 w-full md:w-1/3">
      <h1 className="w-full text-4xl font-bold">Overview</h1>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-green-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">Single PB</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{formatTime(singlePb)}</p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-blue-500 rounded text-xl shadow-sm">
            <HiHashtag />
          </span>
          <span className="text-lg font-bold">Total solves</span>
        </h2>
        <p className="text-3xl font-mono font-bold">{totalSolves}</p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-red-500 rounded text-xl shadow-sm">
            <BsFillClockFill />
          </span>
          <span className="text-lg font-bold">Time spent cubing</span>
        </h2>
        <p className="text-2xl font-mono font-bold">
          {formatTime(timeSpentCubing)}
        </p>
      </article>
    </section>
  );
};

export default Overview;
