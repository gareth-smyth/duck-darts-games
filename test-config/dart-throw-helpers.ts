import { DartBoardSegment } from '../src/games/common/types/dart-board-segment';
import { DartScore } from '../src/games/common/types/dart-score';
import { RoundTheClock } from '../src/games/round-the-clock/round-the-clock';

function allDartsOfValueFn(value: DartBoardSegment): DartScore[] {
    return [
        { value, modifier: 1 },
        { value, modifier: 2 },
        { value, modifier: 3 },
    ];
}

function completeTurnFn(game: RoundTheClock) {
    throwDarts(game, [{ miss: true }, { miss: true }, { miss: true }]);
}

function throwDartsFn(game: RoundTheClock, darts: DartScore[]) {
    darts.forEach((dart) => game.dartThrown(dart));
}

// @ts-expect-error setting up test global helpers
global.throwDarts = throwDartsFn;
// @ts-expect-error setting up test global helpers
global.completeTurn = completeTurnFn;
// @ts-expect-error setting up test global helpers
global.allDartsOfValue = allDartsOfValueFn;

declare global {
    const throwDarts: typeof throwDartsFn;
    const completeTurn: typeof completeTurnFn;
    const allDartsOfValue: typeof allDartsOfValueFn;
}
