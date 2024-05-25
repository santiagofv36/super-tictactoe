import Grid from './Grid';

export default function Tictactoe() {
  return (
    <div className="h-[800px] flex justify-center items-center">
      <Grid depth={2} limit={3} />
    </div>
  );
}
