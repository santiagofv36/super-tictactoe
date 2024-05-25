export enum TURN {
  X = 'X',
  O = 'O',
}

export type Play = {
  row: number;
  col: number;
  turn: TURN;
};
