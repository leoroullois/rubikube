import { useTimes } from "@hooks/use-time";
import { selectSolves } from "@store/selectors";
import React, { FC } from "react";
import { IoTrophy } from "react-icons/io5";
import { useSelector } from "react-redux";
interface IStreaks {
  curr: number;
  best: number;
}

const MoreStats: FC = () => {
  const { formatTime } = useTimes();
  const { times } = useSelector(selectSolves);
  const totalSolves = times.length;

  const timeSpentCubing = times.reduce((acc, curr) => acc + curr.time, 0);
  const average = Math.round(timeSpentCubing / totalSolves);
  const nbDnfs = times.filter((t) => t.dnf).length;
  const nbPenalty = times.filter((t) => t.penalty).length;

  const streaks: IStreaks = {
    curr: 1,
    best: 1,
  };

  return (
    <section className="flex flex-row flex-wrap justify-center md:justify-start gap-4 w-full md:w-1/2">
      <h2 className="w-full text-4xl font-bold">More statistics</h2>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-green-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">Average</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{formatTime(average)}</p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-red-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">DNFs</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{nbDnfs}</p>
        <p className="text-xl text-gray-900/80 dark:text-gray-100/70 font-mono font-bold">
          ({Math.round((10 * nbDnfs) / totalSolves) / 10}%)
        </p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-red-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">+2</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{nbPenalty}</p>
        <p className="text-xl text-gray-900/80 dark:text-gray-100/70 font-mono font-bold">
          ({Math.round((10 * nbPenalty) / totalSolves) / 10}%)
        </p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-blue-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">Current streak</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{streaks.curr} days</p>
      </article>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-52 h-40 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <h2 className="flex flex-row items-center w-full gap-x-3">
          <span className="p-2 bg-blue-500 rounded text-xl shadow-sm">
            <IoTrophy />
          </span>
          <span className="text-lg font-bold">Best streak</span>
        </h2>
        <p className="text-2xl font-mono font-bold">{streaks.best} days</p>
      </article>
    </section>
  );
};

export default MoreStats;
