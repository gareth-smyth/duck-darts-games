import { DartScore } from './dart-score';

export type RoundTheClockScoreBoard = RoundTheClockScoreBoardForTeam[];

export interface RoundTheClockScoreBoardForTeam {
    team: string;
    nextRequiredScore: DartScore[];
}
