import React, { FC } from "react";
import { useSelector } from "react-redux";

import { useTimes } from "@hooks/use-time";
import { selectSolves } from "@store/selectors";

const AllTimes: FC = () => {
  const { times } = useSelector(selectSolves);

  const { formatTime } = useTimes();
  return (
    <section className="flex flex-row flex-wrap gap-4">
      <h2 className="w-full text-4xl font-bold">All times</h2>
      <article className="flex flex-row max-h-96 overflow-y-scroll flex-wrap justify-evenly items-center gap-3 px-5 py-3 w-96 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
        <table className="w-full rounded">
          <tbody>
            {[...times].reverse().map(({ time, dnf, penalty }, i) => (
              <tr
                className="flex first:rounded-t-xl last:rounded-b-xl flex-row justify-between items-center px-5 py-2 w-full odd:bg-white/80 even:bg-slate-200/80 dark:odd:bg-gray-900/30 dark:even:bg-gray-50/5"
                key={i}
              >
                <td className="flex flex-row gap-x-2 font-semibold">
                  {times.length - i}.
                </td>
                <td className="font-mono text-right translate-x-2">
                  {formatTime(time)}
                </td>

                <td className="w-9 text-right">
                  {dnf ? (
                    <span className="text-red-500">DNF</span>
                  ) : (
                    <span className="text-red-500">{penalty ? `+2` : ""}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default AllTimes;
