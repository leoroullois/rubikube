import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import Wrapper from "@components/wrapper";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import CubePattern from "@components/cube-pattern";

const Timer = () => {
  const [mounted, setMounted] = useState(false);

  const [ms, setMs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [times, setTimes] = useState<number[]>([]);

  const [cube] = useState(new ThreeByThree());
  const [cubeArray, setCubeArray] = useState(cube.cubeArray);
  const [scramble, setScramble] = useState(cube.scramble);

  const resetTimer = () => {
    setMs(0);
    setIsActive(false);
  };
  const startTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  };

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

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setMs((ms) => ms + 10);
      }, 10);
    }
    return () => {
      !!interval && clearInterval(interval);
    };
  }, [isActive]);

  const [start, setStart] = useState(true);
  const [lastIsKeyDown, setLastIsKeyDown] = useState(false);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("keydown", e.key, start);
      if (!lastIsKeyDown) {
        if (isActive) {
          setStart(false);
        } else {
          setStart(true);
        }

        // ? stop timer
        if (isActive) {
          times.push(ms);
          stopTimer();
        }
        setLastIsKeyDown(true);
      }
    },
    [isActive, lastIsKeyDown, ms, start, times]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("keyup", e.key, start);
      if (!isActive && e.key === " " && start) {
        setMs(0);
        startTimer();
      }
      setLastIsKeyDown(false);
    },
    [isActive, start]
  );

  const updateCubeState = useCallback((cube: ThreeByThree) => {
    setCubeArray(cube.cubeArray);
    setScramble(cube.scramble);
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    cube.randomlyScrambleCube();
    updateCubeState(cube);
    setMounted(true);
  }, [cube, updateCubeState]);

  const formatTime = (ms: number | string) => {
    const nb = Number(ms);
    if (Number.isNaN(nb)) {
      return "--:--";
    }
    return `${getSeconds(nb).toString().padStart(2, "0")}:${getDecimals(nb)
      .toString()
      .padEnd(2, "0")}`;
  };
  return (
    <>
      <Head>
        <title>Timer</title>
      </Head>
      <main className="flex flex-col">
        <Wrapper className="flex flex-col gap-y-5">
          <h1 className="text-3xl text-center my-5 font-bold">Timer</h1>
          <h2 className="text-xl text-center font-bold">{scramble}</h2>
          <h2 className="text-5xl text-center font-mono font-medium">
            {formatTime(ms)}
          </h2>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
          <>{!!mounted && <CubePattern cubeArray={cubeArray} />}</>
          <ul>
            <li>AO5 : {formatTime(getAo(5, times))}</li>
            <li>AO12 : {formatTime(getAo(12, times))}</li>
            <li>AO50 : {formatTime(getAo(50, times))}</li>
          </ul>
        </Wrapper>
      </main>
    </>
  );
};

export default Timer;
