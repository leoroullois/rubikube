import { Moves } from "@lib/cubes/Moves";
import { Color, CubeArray } from "@lib/cubes/types";
import React, { FC, MouseEventHandler } from "react";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";

interface IProps {
  kbd: Moves;
  active: Moves | null;
  handleClick: MouseEventHandler;
  cubeArray: CubeArray;
}

const mapMoves = (move: Moves): string => {
  if (move === Moves.L || move === Moves.Li || move === Moves.L2) {
    return "Left";
  } else if (move === Moves.R || move === Moves.Ri || move === Moves.R2) {
    return "Right";
  } else if (move === Moves.F || move === Moves.Fi || move === Moves.F2) {
    return "Front";
  } else if (move === Moves.B || move === Moves.Bi || move === Moves.B2) {
    return "Back";
  } else if (move === Moves.U || move === Moves.Ui || move === Moves.U2) {
    return "Up";
  } else if (move === Moves.D || move === Moves.Di || move === Moves.D2) {
    return "Down";
  }
  return "";
};
const mapColorToTailwind = (color: Color): string => {
  switch (color) {
    case Color.Red:
      return "bg-red-500";
    case Color.Orange:
      return "bg-orange-500";
    case Color.Yellow:
      return "bg-yellow-500";
    case Color.Green:
      return "bg-green-500";
    case Color.Blue:
      return "bg-blue-500";
    case Color.White:
      return "bg-gray-200";
    default:
      return "bg-gray-900";
  }
};
const mapMoveToTailwindColor = (move: Moves, cubeArray: CubeArray): string => {
  if (move === Moves.L || move === Moves.Li || move === Moves.L2) {
    return mapColorToTailwind(cubeArray[1][4]);
  } else if (move === Moves.R || move === Moves.Ri || move === Moves.R2) {
    return mapColorToTailwind(cubeArray[3][4]);
  } else if (move === Moves.F || move === Moves.Fi || move === Moves.F2) {
    return mapColorToTailwind(cubeArray[2][4]);
  } else if (move === Moves.B || move === Moves.Bi || move === Moves.B2) {
    return mapColorToTailwind(cubeArray[4][4]);
  } else if (move === Moves.U || move === Moves.Ui || move === Moves.U2) {
    return mapColorToTailwind(cubeArray[0][4]);
  } else if (move === Moves.D || move === Moves.Di || move === Moves.D2) {
    return mapColorToTailwind(cubeArray[5][4]);
  }
  return "bg-gray-900";
};
const KbdBtn: FC<IProps> = ({ kbd, active, handleClick, cubeArray }) => {
  const isActive = (): boolean => {
    return active === kbd;
  };

  return (
    <button
      type="button"
      role="button"
      className={`flex items-center h-8 ${mapMoveToTailwindColor(
        kbd,
        cubeArray
      )} text-gray-900 active:ring ${
        isActive() && "ring"
      } gap-x-2 px-3 rounded-lg shadow-sm hover:shadow-xl duration-150 border border-gray-500/30 hover:border-gray-400/30`}
      onClick={handleClick}
    >
      <kbd
        className={`flex justify-center items-center bg-slate-900/30 rounded w-6 h-6 font-bold`}
      >
        {kbd.includes("'") ? (
          <BsArrowCounterclockwise className="text-slate-200 w-4 h-4" />
        ) : (
          <BsArrowClockwise className="text-slate-200 w-4 h-4" />
        )}
      </kbd>
      <div className="flex h-full w-px bg-slate-400/20"></div>
      <span className="font-bold">{mapMoves(kbd)}</span>
    </button>
  );
};

export default KbdBtn;
