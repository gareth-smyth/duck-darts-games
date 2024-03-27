import { DartBoardSegment } from '../../common/types/dart-board-segment';

export type RoundTheClockScore = RoundTheClockScoreForTeam[];

export interface RoundTheClockScoreForTeam {
    team: string;
    neededScore: DartBoardSegment;
    finished: boolean;
}
