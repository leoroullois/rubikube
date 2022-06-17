import React, { FC } from "react";
import { useSelector } from "react-redux";

import { useTimes } from "@hooks/use-time";
import { selectSolves } from "@store/selectors";

const Averages: FC = () => {
  const { times } = useSelector(selectSolves);
  const { formatTime, getAo } = useTimes();

  const averages = [
    {
      type: 5,
      value: getAo(
        5,
        times.map((t) => t.time)
      ),
    },
    {
      type: 12,
      value: getAo(
        12,
        times.map((t) => t.time)
      ),
    },
    {
      type: 50,
      value: getAo(
        50,
        times.map((t) => t.time)
      ),
    },
    {
      type: 100,
      value: getAo(
        100,
        times.map((t) => t.time)
      ),
    },
    {
      type: 500,
      value: getAo(
        500,
        times.map((t) => t.time)
      ),
    },
    {
      type: 1000,
      value: getAo(
        1000,
        times.map((t) => t.time)
      ),
    },
    {
      type: 2000,
      value: getAo(
        2000,
        times.map((t) => t.time)
      ),
    },
  ];
  return (
    <section className="flex flex-row flex-wrap md:flex-col gap-4 w-96 max-w-full md:w-1/3">
      <h2 className="w-full text-4xl font-bold">Averages</h2>
      <article className="flex flex-row flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-full max-w-full bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <table className="w-full rounded">
          <tbody>
            {averages.map((average) => (
              <tr
                className="flex first:rounded-t-xl last:rounded-b-xl flex-row justify-between items-center px-5 py-2 w-full odd:bg-white/80 even:bg-slate-200/80 dark:odd:bg-gray-900/30 dark:even:bg-gray-50/5"
                key={average.type}
              >
                <td className="flex flex-row gap-x-2 font-semibold">
                  <span>Average of </span>
                  <span className="text-red-500">{average.type}</span>
                </td>
                <td className="font-mono text-right">
                  {formatTime(average.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Averages;
