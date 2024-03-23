import { RoundTheClockScoreBoard } from '../../round-the-clock/types/round-the-clock-score-board';
import { CurrentPlayer } from './current-player';
import { DartScore } from './dart-score';
import { Team } from './team';
import { GameName } from './game-name';

export type GameConfiguration = Record<string, string | number | boolean | object | undefined>;

export interface Game {
    getName: () => GameName;
    start: (teams: Team[]) => void;
    getScoreBoard: () => ScoreBoard;
    getCurrentPlayer: () => CurrentPlayer;
    dartThrown: (dart: DartScore) => void;
}

export type ScoreBoard = RoundTheClockScoreBoard;

export type Finished = 'finished';
