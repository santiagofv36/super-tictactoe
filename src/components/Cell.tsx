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
  const hasValue = plays.some((play) => play.row === row && play.col === col);

  const onPlay = () => {
    if (!hasValue) {
      onRegisterPlay({ row, col, turn });
    }
    console.log(row, col);
  };

  return (
    <div
      className="flex justify-center items-center p-8 size-12"
      onClick={onPlay}
      role="button"
    >
      {hasValue &&
        plays.find((play) => play.row === row && play.col === col)?.turn}
    </div>
  );
}
