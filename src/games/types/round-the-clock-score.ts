import { DartBoardSegment } from './dart-board-segment';

export type RoundTheClockScore = RoundTheClockScoreForTeam[];

export interface RoundTheClockScoreForTeam {
    team: string;
    neededScore: DartBoardSegment;
}
