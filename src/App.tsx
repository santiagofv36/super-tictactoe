import Tictactoe from './components/Tictactoe';

export default function App() {
  return (
    <main className="flex flex-col items-center bg-slate-800 min-h-screen pt-4 w-full gap-8">
      <header className="flex flex-col items-center text-white gap-4">
        <h1 className="font-bold text-5xl">Super Tictactoe</h1>
        <p className="text-lg">Welcome to Super Tictactoe</p>
      </header>
      <section className="bg-white flex justify-center items-center px-32 h-full">
        <Tictactoe />
      </section>
    </main>
  );
}
