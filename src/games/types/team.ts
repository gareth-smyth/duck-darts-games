import {Player} from "./player";

export interface Team {
  id: string,
  name: string,
  players: Player[],
}
