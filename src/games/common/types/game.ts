import { RoundTheClockScoreBoard } from '../../round-the-clock/types/round-the-clock-score-board';
import { CurrentPlayer } from './current-player';
import { DartScore } from './dart-score';
import { Team } from './team';

export interface Game {
    start: (teams: Team[]) => void;
    getScoreBoard: () => ScoreBoard;
    getCurrentPlayer: () => CurrentPlayer;
    dartThrown: (dart: DartScore) => void;
}

export type ScoreBoard = RoundTheClockScoreBoard;

export type Finished = 'finished';
