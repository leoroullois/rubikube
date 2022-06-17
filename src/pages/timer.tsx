import Head from "next/head";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCopy, IoReload } from "react-icons/io5";

import CubePattern from "@components/cube-pattern";
import StatsLi from "@components/stats-list/stats-li";
import StatsUl from "@components/stats-list/stats-ul";
import TimesLi from "@components/times-list/times-li";
import TimesUl from "@components/times-list/times-ul";
import Wrapper from "@components/wrapper";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { useTimes } from "@hooks/use-time";

const Timer = () => {
  const [mounted, setMounted] = useState(false);

  const [ms, setMs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [times, setTimes] = useState<number[]>([]);

  const [cube] = useState(new ThreeByThree());
  const [cubeArray, setCubeArray] = useState(cube.cubeArray);
  const [scramble, setScramble] = useState(cube.scramble);
  const [isScrambleDisabled, setIsScrambleDisabled] = useState(true);

  const { getDecimals, getSeconds, getMinutes, getAo, getMean, formatTime } =
    useTimes();

  const startTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
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
      console.log("keydown", e.key, start);
      if (isScrambleDisabled) {
        e.preventDefault();
        if (!lastIsKeyDown) {
          if (isActive) {
            setStart(false);
          } else {
            setStart(true);
          }

          // ? stop timer
          if (isActive) {
            cube.resetCubeArray();
            cube.randomlyScrambleCube();
            setCubeArray(cube.cubeArray);
            setScramble(cube.scramble);
            times.push(ms);
            stopTimer();
          }
          setLastIsKeyDown(true);
        }
      }
    },
    [isActive, lastIsKeyDown, ms, start, times, cube, isScrambleDisabled]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      console.log("keyup", e.key, start);
      if (isScrambleDisabled) {
        if (!isActive && e.key === " " && start) {
          setMs(0);
          startTimer();
        }
        setLastIsKeyDown(false);
      }
    },
    [isActive, start, isScrambleDisabled]
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

  const handleReload: MouseEventHandler = (e) => {
    console.log(e);
    cube.resetCubeArray();
    cube.randomlyScrambleCube();
    setCubeArray(cube.cubeArray);
    setScramble(cube.scramble);
  };
  const handleCopy: MouseEventHandler = (e) => {
    console.log(e);
    navigator.clipboard.writeText(scramble);
  };
  const handleEdit: MouseEventHandler = (e) => {
    console.log(e);
    setIsScrambleDisabled(false);
    setTimeout(() => {
      const input = document.querySelector(
        "#scramble-input"
      ) as HTMLInputElement;
      input.focus();
    }, 10);
  };
  const handleChangeScramble: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target as HTMLInputElement;
    setScramble(input.value);
  };
  const handleBlur = () => {
    setIsScrambleDisabled(true);
  };

  return (
    <>
      <Head>
        <title>Timer</title>
      </Head>
      <main className="flex flex-col">
        <Wrapper className="flex flex-col gap-y-5 py-5 h-full">
          <aside>
            {!!times && (
              <TimesUl title="Your latest times">
                <TimesLi
                  time={formatTime(times[0])}
                  ao5={formatTime(12)}
                  ao12={formatTime(14)}
                />
                <TimesLi
                  time={formatTime(times[0])}
                  ao5={formatTime(12)}
                  ao12={formatTime(14)}
                />
                <TimesLi
                  time={formatTime(times[0])}
                  ao5={formatTime(12)}
                  ao12={formatTime(14)}
                />
                <TimesLi
                  time={formatTime(times[0])}
                  ao5={formatTime(12)}
                  ao12={formatTime(14)}
                />
              </TimesUl>
            )}
          </aside>
          <section className="flex flex-col justify-center py-20 gap-y-10 min-h-max">
            <input
              type="text"
              id="scramble-input"
              className="py-1 px-4 bg-transparent outline-none focus:ring text-2xl text-center font-bold rounded"
              value={scramble}
              onChange={handleChangeScramble}
              onBlur={handleBlur}
              disabled={isScrambleDisabled}
            />
            <p className="flex flex-row justify-center w-full gap-x-10 text-lg">
              <AiFillEdit className="cursor-pointer" onClick={handleEdit} />
              <IoReload className="cursor-pointer" onClick={handleReload} />
              <IoCopy className="cursor-pointer" onClick={handleCopy} />
            </p>
            <h1 className="text-6xl text-center font-mono font-medium">
              {formatTime(ms)}
            </h1>
          </section>
          <section className="flex flex-col h-auto xl:flex-row items-center max-w-full gap-5 p-5 bg-gray-900/5 dark:bg-gray-200/5 rounded-xl shadow-sm border border-gray-900/10 dark:border-gray-50/10 hover:shadow-md duration-150 overflow-hidden">
            <StatsUl title="Basic statistics">
              <StatsLi name="Total" data={times.length.toString()} />
              <StatsLi name="Ecart-type" data={formatTime(getMean(times))} />
              <StatsLi name="Mean" data={formatTime(getMean(times))} />
              <StatsLi name="Best" data={formatTime(getMean(times))} />
              <StatsLi name="Worst" data={formatTime(getMean(times))} />
            </StatsUl>
            <article className="scale-75 sm:scale-100">
              {!!mounted && <CubePattern cubeArray={cubeArray} />}
            </article>
            <StatsUl title="AOs">
              <StatsLi name="AO5" data={formatTime(getAo(5, times))} />
              <StatsLi name="AO12" data={formatTime(getAo(12, times))} />
              <StatsLi name="AO50" data={formatTime(getAo(50, times))} />
              <StatsLi name="AO100" data={formatTime(getAo(100, times))} />
            </StatsUl>
          </section>
        </Wrapper>
      </main>
    </>
  );
};

export default Timer;
