import { DartScore } from './dart-score';

export interface CurrentPlayer {
    teamId: string;
    id: string;
    dartsThrown: DartScore[];
}
