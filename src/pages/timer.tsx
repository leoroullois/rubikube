import Head from "next/head";
import Link from "next/link";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoAdd, IoCopy, IoReload } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import BasicStatsLi from "@components/basic-stats-list/basic-stats-li";
import BasicStatsUl from "@components/basic-stats-list/basic-stats-ul";
import CubePattern from "@components/cube-pattern";
import StatsLi from "@components/stats-list/stats-li";
import StatsUl from "@components/stats-list/stats-ul";
import TimesLi from "@components/times-list/times-li";
import TimesUl from "@components/times-list/times-ul";
import Wrapper from "@components/wrapper";
import { useMath } from "@hooks/use-math";
import { useTimes } from "@hooks/use-time";
import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { selectSolves } from "@store/selectors";
import { addSolve } from "@store/slices/solves";

import { v4 as uuidv4 } from "uuid";

const Timer = () => {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  const [ms, setMs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { times } = useSelector(selectSolves);

  const [cube] = useState(new ThreeByThree());
  const [cubeArray, setCubeArray] = useState(cube.cubeArray);
  const [scramble, setScramble] = useState(cube.scramble);
  const [isScrambleDisabled, setIsScrambleDisabled] = useState(true);

  const { formatTime } = useTimes();
  const { getAo, getMean, getStandardDeviation, getMinimum, getMaximum } =
    useMath();

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
            dispatch(
              addSolve({
                id: uuidv4(),
                time: ms,
                scramble: cube.scramble,
                date: new Date().toISOString(),
                penalty: false,
                dnf: false,
              })
            );
            stopTimer();
          }
          setLastIsKeyDown(true);
        }
      }
    },
    [dispatch, isActive, lastIsKeyDown, ms, start, cube, isScrambleDisabled]
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
    cube.resetCubeArray();
    cube.move(scramble);
    setCubeArray(cube.cubeArray);
    setIsScrambleDisabled(true);
  };

  return (
    <>
      <Head>
        <title>Timer</title>
      </Head>
      <main className="flex flex-col">
        <Wrapper className="flex flex-col md:flex-row flex-wrap  justify-between items-center gap-y-5 py-5">
          <div className="flex flex-col lg:flex-row justify-between w-full h-9/12">
            <aside className="flex flex-col sm:flex-col items-center md:justify-center sm:w-auto bg-gray-900/5 dark:bg-gray-50/5 border-4 border-gray-900/10 dark:border-gray-50/10 rounded-lg py-3">
              {!!times && (
                <TimesUl title="Your latest times">
                  <div className="flex flex-col gap-y-3 w-full sm:w-auto">
                    <li className="text-lg font-semibold">Last</li>
                    <TimesLi
                      time={times.slice(-1)[0] ?? null}
                      ao5={formatTime(12)}
                      ao12={formatTime(14)}
                    />
                  </div>
                  <div className="flex flex-col gap-y-3 w-full sm:w-auto">
                    <li className="text-lg font-semibold">Second to last</li>
                    <TimesLi
                      time={times.slice(-2, -1)[0] ?? null}
                      ao5={formatTime(12)}
                      ao12={formatTime(14)}
                    />
                  </div>
                </TimesUl>
              )}
              <Link href="/dashboard">
                <a className="flex flex-row items-center justify-cente p-2 bg-blue-500 rounded hover:bg-blue-600 duration-150">
                  <IoAdd className="text-2xl font-bold" />
                </a>
              </Link>
            </aside>
            <div>
              <section className="flex flex-col max-w-full justify-center py-20 gap-y-10 min-h-max">
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
              <article className="flex flex-row sm:justify-center scale-75 sm:scale-75 md:scale-100 max-w-full overflow-x-scroll sm:overflow-x-auto">
                {!!mounted && <CubePattern cubeArray={cubeArray} />}
              </article>
            </div>
            <StatsUl title="AOs">
              <StatsLi
                name="AO5"
                data={formatTime(
                  getAo(
                    5,
                    times.map((t) => t.time)
                  )
                )}
              />
              <StatsLi
                name="AO12"
                data={formatTime(
                  getAo(
                    12,
                    times.map((t) => t.time)
                  )
                )}
              />
              <StatsLi
                name="AO50"
                data={formatTime(
                  getAo(
                    50,
                    times.map((t) => t.time)
                  )
                )}
              />
              <StatsLi
                name="AO100"
                data={formatTime(
                  getAo(
                    100,
                    times.map((t) => t.time)
                  )
                )}
              />
            </StatsUl>
          </div>
          <BasicStatsUl title="Basic statistics">
            <BasicStatsLi name="Total" data={times.length.toString()} />
            <BasicStatsLi
              name="Standard deviation"
              data={formatTime(getStandardDeviation(times.map((t) => t.time)))}
            />
            <BasicStatsLi
              name="Mean"
              data={formatTime(getMean(times.map((t) => t.time)))}
            />
            <BasicStatsLi
              name="Best"
              data={formatTime(
                times.length ? getMinimum(times.map((t) => t.time)) : 0
              )}
            />
            <BasicStatsLi
              name="Worst"
              data={formatTime(
                times.length ? getMinimum(times.map((t) => t.time)) : 0
              )}
            />
          </BasicStatsUl>
        </Wrapper>
      </main>
    </>
  );
};

export default Timer;
