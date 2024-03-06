import { DartScore } from './dart-score';

export interface CurrentPlayer {
    team: string;
    player: string;
    dartsThrown: DartScore[];
}
