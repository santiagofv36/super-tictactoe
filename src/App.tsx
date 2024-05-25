import React from 'react';
import Tictactoe from './components/Tictactoe';
import { Play } from './types/enums';

export default function App() {
  const [depth, setDepth] = React.useState(1);
  

  const onDepthChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setDepth(Number(name));
  };

  const [plays, setPlays] = React.useState<Play[]>([]);

  return (
    <main className="flex flex-col items-center bg-slate-800 min-h-screen pt-4 w-full gap-4">
      <header className="flex flex-col items-center text-white">
        <h1 className="font-bold text-5xl">Super Tictactoe</h1>
      </header>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          name="1"
          onClick={onDepthChange}
          disabled={depth === 1}
        >
          Depth 1
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          name="2"
          onClick={onDepthChange}
          disabled={depth === 2}
        >
          Depth 2
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          onClick={() => setPlays([])}
          disabled={plays.length === 0}
        >
          Reset
        </button>
      </div>
      <section className="bg-white flex justify-center items-center px-20 h-full">
        <Tictactoe depth={depth} plays={plays} setPlays={setPlays} />
      </section>
    </main>
  );
}
