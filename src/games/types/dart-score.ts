import {
    DartBoardSegment,
    DartBoardSegmentModifier,
} from './dart-board-segment';

export type DartScore = ScoringDart | MissedDart;

export interface ScoringDart {
    value: DartBoardSegment;
    modifier: DartBoardSegmentModifier;
}

export interface MissedDart {
    miss: true;
}
