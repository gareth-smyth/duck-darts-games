import { DartBoardSegment } from '../../common/types/dart-board-segment';
import { Finished } from '../../common/types/game';

export type RoundTheClockScore = RoundTheClockScoreForTeam[];

export interface RoundTheClockScoreForTeam {
    team: string;
    neededScore: DartBoardSegment | Finished;
}
