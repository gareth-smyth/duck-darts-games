import { ScoringDart } from '../../common/types/dart-score';

export type RoundTheClockScoreBoard = RoundTheClockScoreBoardForTeam[];

export interface RoundTheClockScoreBoardForTeam {
    team: string;
    nextRequiredScore: ScoringDart[];
    finished: boolean;
}
