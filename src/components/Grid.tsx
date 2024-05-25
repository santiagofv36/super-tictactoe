import React from 'react';
import { Play, TURN } from '../types/enums';
import Cell from './Cell';

interface GridProps {
  depth: number;
  limit?: number;
  plays: Play[];
  setPlays: React.Dispatch<React.SetStateAction<Play[]>>;
}

export default function Grid({ depth, limit = 3, plays, setPlays }: GridProps) {
  const [turn, setTurn] = React.useState<TURN>(TURN.X);
  const [winner, setWinner] = React.useState<TURN | null>(null);

  const checkWinner = React.useCallback(() => {
    const board: (TURN | undefined)[][] = Array.from({ length: limit }, () =>
      Array.from({ length: limit }, () => undefined)
    );

    plays.forEach((play) => {
      const { row, col, turn } = play;
      board[row][col] = turn;
    });

    // Check rows
    for (let i = 0; i < limit; i++) {
      if (board[i].every((cell) => cell === TURN.X)) {
        setWinner(TURN.X);
      }

      if (board[i].every((cell) => cell === TURN.O)) {
        setWinner(TURN.O);
      }
    }

    // Check columns
    for (let i = 0; i < limit; i++) {
      if (board.every((row) => row[i] === TURN.X)) {
        setWinner(TURN.X);
      }

      if (board.every((row) => row[i] === TURN.O)) {
        setWinner(TURN.O);
      }
    }

    // Check diagonals
    if (board.every((row, i) => row[i] === TURN.X)) {
      setWinner(TURN.X);
    }

    if (board.every((row, i) => row[i] === TURN.O)) {
      setWinner(TURN.O);
    }

    if (board.every((row, i) => row[limit - 1 - i] === TURN.X)) {
      setWinner(TURN.X);
    }

    if (board.every((row, i) => row[limit - 1 - i] === TURN.O)) {
      setWinner(TURN.O);
    }

    // Check draw
    if (plays.length === limit * limit) {
      setWinner(null);
    }
  }, [plays, limit]);

  React.useEffect(() => {
    checkWinner();
    if (plays.length === 0) {
      setWinner(null);
    }
  }, [plays, checkWinner]);

  if (depth <= 0) {
    return null;
  }

  const onPlay = (play: Play) => {
    setPlays((prev) => [...prev, play]);
    setTurn(turn === TURN.X ? TURN.O : TURN.X);
  };

  return (
    <div className="relative flex flex-col w-full">
      {winner && (
        <div className="absolute z-10 bg-white/50 w-full flex justify-center -mt-2 items-center h-full text-[250px]">
          {winner}
        </div>
      )}
      {Array.from({ length: limit }, (_, i) => (
        <div className="w-full flex" key={i + 15}>
          {Array.from({ length: limit }, (_, j) => (
            <div
              className={`${i === limit - 1 ? '' : 'border-b-4'}  ${
                j === limit - 1 ? '' : 'border-r-4'
              } border-black w-full ${depth - 1 !== 0 ? 'p-6' : ''} ${
                winner ? 'pointer-events-none' : ''
              }`}
              key={j}
              id={`${i}-${j}`}
              role="button"
            >
              <Grid
                depth={depth - 1}
                limit={limit}
                plays={plays.filter((play) => play.row === i && play.col === j)}
                setPlays={setPlays}
              />
              {depth - 1 === 0 && (
                <Cell
                  row={i}
                  col={j}
                  onRegisterPlay={onPlay}
                  turn={turn}
                  plays={plays.filter(
                    (play) => play.row === i && play.col === j
                  )}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
