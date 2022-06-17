export const useMath = () => {
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

  const getStandardDeviation = (times: number[]) => {
    const mean = getMean(times);
    const sum = times.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
    return Math.round(Math.sqrt(sum / times.length));
  };

  const getMinimum = (times: number[]) => {
    return Math.min(...times);
  };
  const getMaximum = (times: number[]) => {
    return Math.max(...times);
  };

  return {
    getAo,
    getMean,
    getStandardDeviation,
    getMinimum,
    getMaximum,
  };
};
