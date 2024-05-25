import React from 'react';
import { Play, TURN } from '../types/enums';

interface CellProps {
  row: number;
  col: number;
  onRegisterPlay: (play: Play) => void;
  turn: TURN;
  plays: Play[];
}

export default function Cell({
  onRegisterPlay,
  row,
  col,
  turn,
  plays,
}: CellProps) {
  const [value, setValue] = React.useState<TURN.X | TURN.O | undefined>(
    undefined
  );

  const onPlay = () => {
    setValue(turn);
    onRegisterPlay({ row, col, turn });
  };

  const hasValue = plays.some((play) => play.row === row && play.col === col);

  return (
    <div
      className="flex justify-center items-center p-8 size-12"
      onClick={onPlay}
      role="button"
    >
      {hasValue && value}
    </div>
  );
}
