import { DartScore } from '../../common/types/dart-score';
import { Finished } from '../../common/types/game';

export type RoundTheClockScoreBoard = RoundTheClockScoreBoardForTeam[];

export interface RoundTheClockScoreBoardForTeam {
    team: string;
    nextRequiredScore: DartScore[] | Finished;
}
