export const useTimes = () => {
  const getDecimals = (ms: number) => {
    return Math.floor(ms / 10) % 100;
  };
  const getSeconds = (ms: number) => Math.floor(ms / 1000);
  const getMinutes = (ms: number) => Math.floor(getSeconds(ms) / 60);

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
    formatTime,
  };
};
