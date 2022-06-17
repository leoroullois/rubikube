import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import { selectCube, selectSolves } from "@store/selectors";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 4560, amt: 2400 },
  { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
];
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active) {
    return (
      <div className="flex flex-col bg-gray-900/80 text-gray-100 p-2 rounded">
        <p className="label">{`Solve ${label}`}</p>
        <p>{`Time : ${payload?.[0].value}s`}</p>
      </div>
    );
  }

  return null;
};

const RenderLineChart: FC = () => {
  const { times } = useSelector(selectSolves);
  const data = times
    .map((t) => Math.round(t.time / 10) / 100)
    .map((t) => ({
      name: t,
      Seconds: t,
    }));
  return (
    <ResponsiveContainer width="99%" height={384 - 60}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="Seconds" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const YourTimes: FC = () => (
  <section className="flex flex-row flex-wrap gap-4 w-full md:w-7/12">
    <h2 className="w-full text-4xl font-bold">
      Your times{" "}
      <span className="w-full text-lg font-semibold text-neutral-900/60 dark:text-neutral-100/70">
        (in seconds)
      </span>
    </h2>
    <article className="flex flex-wrap overflow-x-scroll justify-center items-center gap-3 px-5 py-3 w-full h-96 bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg">
      <RenderLineChart />
    </article>
  </section>
);

export default YourTimes;
