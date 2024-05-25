import React from 'react';
import { Play, TURN } from '../types/enums';
import Grid from './Grid';

interface TictactoeProps {
  depth: number;
  plays: Play[];
  setPlays: React.Dispatch<React.SetStateAction<Play[]>>;
}

export default function Tictactoe({ depth, plays, setPlays }: TictactoeProps) {
  const [nextGrid, setNextGrid] = React.useState<[number, number] | null>(null);
  const [currentTurn, setCurrentTurn] = React.useState<TURN>(TURN.X);

  const handleRegisterPlay = (play: Play) => {
    setPlays((prev) => [...prev, play]);
    setCurrentTurn((prev) => (prev === TURN.X ? TURN.O : TURN.X));
  };

  return (
    <div className="h-[800px] flex justify-center items-center z-20">
      <Grid
        depth={depth}
        limit={3}
        globalPlays={plays}
        setGlobalPlays={handleRegisterPlay}
        setNextGrid={setNextGrid}
        disabled={false}
        nextGrid={nextGrid}
        turn={currentTurn}
      />
    </div>
  );
}
