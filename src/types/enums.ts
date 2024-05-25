export enum TURN {
  X = 'X',
  O = 'O',
  D = 'D',
}

export type Play = {
  row: number;
  col: number;
  turn: TURN;
};
