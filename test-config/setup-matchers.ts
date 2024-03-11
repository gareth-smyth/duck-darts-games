import { RoundTheClockScoreBoard } from '../src/games/round-the-clock/types/round-the-clock-score-board';
import equal from 'fast-deep-equal/es6';
import { diff } from 'jest-diff';
import { DartScore } from '../src/games/common/types/dart-score';
import { Finished } from '../src/games/common/types/game';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Matchers<R> {
            toHaveTeams(expected: string[]): CustomMatcherResult;
            toHaveNextRequiredScores(expected: (DartScore[] | Finished)[]): CustomMatcherResult;
        }
    }
}

expect.extend({
    toHaveTeams(received: RoundTheClockScoreBoard, expected: string[]): jest.CustomMatcherResult {
        const receivedTeams = received.map((score) => score.team);

        const pass = equal(expected, receivedTeams);

        const message: () => string = () =>
            pass
                ? ''
                : `Received teams do not match expected expected:\n ${diff(expected, receivedTeams)}`;

        return {
            message,
            pass,
        };
    },
});

expect.extend({
    toHaveNextRequiredScores(
        received: RoundTheClockScoreBoard,
        expected: DartScore[],
    ): jest.CustomMatcherResult {
        const receivedScore = received.map((score) => score.nextRequiredScore);

        const pass = equal(expected, receivedScore);

        const message: () => string = () =>
            pass
                ? ''
                : `Received scores do not match expected expected:\n ${diff(expected, receivedScore)}`;

        return {
            message,
            pass,
        };
    },
});

export {};
