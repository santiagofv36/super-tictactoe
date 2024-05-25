import React from 'react';
import { Play, TURN } from '../types/enums';
import Cell from './Cell';

interface GridProps {
  depth: number;
  limit?: number;
  globalPlays: Play[];
  setGlobalPlays: React.Dispatch<React.SetStateAction<Play[]>>;
  baseRow?: number;
  baseCol?: number;
  disabled?: boolean;
}

export default function Grid({
  depth,
  limit = 3,
  globalPlays,
  setGlobalPlays,
  baseRow = 0,
  baseCol = 0,
  disabled = false,
}: GridProps) {
  const [localPlays, setLocalPlays] = React.useState<Play[]>([]);
  const [winner, setWinner] = React.useState<TURN | null>(null);

  const checkWinner = React.useCallback(() => {
    const board: (TURN | undefined)[][] = Array.from({ length: limit }, () =>
      Array.from({ length: limit }, () => undefined)
    );

    localPlays.forEach((play) => {
      const { row, col, turn } = play;
      board[row][col] = turn;
    });

    console.log(localPlays);

    // Check rows
    for (let i = 0; i < limit; i++) {
      if (board[i].every((cell) => cell === TURN.X)) {
        setWinner(TURN.X);
        break;
      }

      if (board[i].every((cell) => cell === TURN.O)) {
        setWinner(TURN.O);
        break;
      }
    }

    // Check columns
    if (!winner) {
      for (let i = 0; i < limit; i++) {
        if (board.every((row) => row[i] === TURN.X)) {
          setWinner(TURN.X);
          break;
        }

        if (board.every((row) => row[i] === TURN.O)) {
          setWinner(TURN.O);
          break;
        }
      }
    }

    // Check main diagonal
    if (!winner) {
      if (board.every((row, i) => row[i] === TURN.X)) {
        setWinner(TURN.X);
      } else if (board.every((row, i) => row[i] === TURN.O)) {
        setWinner(TURN.O);
      }
    }

    // Check anti-diagonal
    if (!winner) {
      if (board.every((row, i) => row[limit - 1 - i] === TURN.X)) {
        setWinner(TURN.X);
      } else if (board.every((row, i) => row[limit - 1 - i] === TURN.O)) {
        setWinner(TURN.O);
      }
    }

    // Check draw
    if (!winner && localPlays.length === limit * limit) {
      setWinner(TURN.D);
    }
  }, [localPlays, limit, winner]);

  React.useEffect(() => {
    checkWinner();
    if (globalPlays.length === 0) {
      setLocalPlays([]);
      setWinner(null);
    }
  }, [globalPlays]);

  const onRegisterPlay = (play: Play) => {
    setLocalPlays((prev) => [...prev, play]);
    setGlobalPlays((prev) => [
      ...prev,
      {
        ...play,
        row: baseRow * limit + play.row,
        col: baseCol * limit + play.col,
      },
    ]);
  };

  if (depth <= 0) {
    return null;
  }

  return (
    <div className={` ${disabled ? 'bg-slate-600 opacity-30' : ''} `}>
      <div className="relative flex flex-col w-full justify-center items-center">
        {depth === 1 && winner ? (
          <div className="absolute text-[250px] flex justify-center items-center w-full">
            <span className="z-10 w-full flex items-center justify-center">
              {winner}
            </span>
          </div>
        ) : null}
        {Array.from({ length: limit }, (_, i) => (
          <div className="w-full flex" key={i + 15}>
            {Array.from({ length: limit }, (_, j) => (
              <div
                className={`${i === limit - 1 ? '' : 'border-b-4'}  ${
                  j === limit - 1 ? '' : 'border-r-4'
                } border-black w-full ${depth - 1 !== 0 ? 'p-6' : ''} 
                ${
                  winner === TURN.X || winner === TURN.O
                    ? 'pointer-events-none'
                    : ''
                }
                `}
                key={j}
                id={`${i}-${j}`}
                role="button"
              >
                {depth - 1 !== 0 ? (
                  <Grid
                    depth={depth - 1}
                    limit={limit}
                    baseRow={baseRow * limit + i}
                    baseCol={baseCol * limit + j}
                    globalPlays={globalPlays}
                    setGlobalPlays={setGlobalPlays}
                  />
                ) : (
                  <Cell
                    row={i}
                    col={j}
                    onRegisterPlay={onRegisterPlay}
                    turn={localPlays.length % 2 === 0 ? TURN.X : TURN.O}
                    plays={localPlays}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
