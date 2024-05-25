import { Play } from '../types/enums';
import Grid from './Grid';

interface TictactoeProps {
  depth: number;
  plays: Play[];
  setPlays: React.Dispatch<React.SetStateAction<Play[]>>;
}

export default function Tictactoe({ depth, plays, setPlays }: TictactoeProps) {
  return (
    <div className="h-[800px] flex justify-center items-center">
      <Grid
        depth={depth}
        limit={3}
        globalPlays={plays}
        setGlobalPlays={setPlays}
      />
    </div>
  );
}
