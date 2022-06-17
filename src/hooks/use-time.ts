export const useTimes = () => {
  const getDecimals = (ms: number) => {
    return Math.floor(ms / 10) % 100;
  };
  const getSeconds = (ms: number) => Math.floor(ms / 1000);
  const getMinutes = (ms: number) => Math.floor(getSeconds(ms) / 60);

  const getAo = (nb: number, times: number[]): string => {
    if (times.length < nb) return "--";
    const aoTimes = [...times].slice(-1 * nb).sort((a, b) => a - b);
    aoTimes.pop();
    aoTimes.shift();
    const sum = aoTimes.reduce((acc, curr) => acc + curr, 0);
    return String(Math.round(sum / aoTimes.length));
  };

  const getMean = (times: number[]) => {
    const sum = times.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / times.length);
  };

  const formatTime = (ms: number | string) => {
    const nb = Number(ms);
    if (Number.isNaN(nb)) {
      return "--:--";
    }
    return `${getSeconds(nb).toString().padStart(2, "0")}:${getDecimals(nb)
      .toString()
      .padEnd(2, "0")}`;
  };

  return {
    getDecimals,
    getSeconds,
    getMinutes,
    getAo,
    getMean,
    formatTime,
  };
};
