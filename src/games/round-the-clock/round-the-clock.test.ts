import { RoundTheClock } from './round-the-clock';
import { DartBoardSegment } from '../common/types/dart-board-segment';
import { DartScore } from '../common/types/dart-score';

it('starts a game with a fresh score board', () => {
    // Arrange
    const newGame = new RoundTheClock();

    // Act
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(1), AllDartsOfValue(1)]);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [],
    });
});

it('it updates the score after a single', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.dartThrown({ value: 1, modifier: 1 });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [{ value: 1, modifier: 1 }],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(2), AllDartsOfValue(1)]);
});

it('it updates the score after a double', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.dartThrown({ value: 1, modifier: 2 });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [{ value: 1, modifier: 2 }],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(3), AllDartsOfValue(1)]);
});

it('it updates the score after a treble', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.dartThrown({ value: 1, modifier: 3 });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [{ value: 1, modifier: 3 }],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(4), AllDartsOfValue(1)]);
});

it('it does not change the score after the wrong dart', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.dartThrown({ value: 10, modifier: 1 });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [{ value: 10, modifier: 1 }],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(1), AllDartsOfValue(1)]);
});

it('it does not change the score after a miss', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.dartThrown({ miss: true });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '1',
        id: '3',
        dartsThrown: [{ miss: true }],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(1), AllDartsOfValue(1)]);
});

it('it changes team after three darts', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    completeTurn(newGame);

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '2',
        id: '4',
        dartsThrown: [],
    });
    expect(scoreBoard).toHaveNextRequiredScores([AllDartsOfValue(1), AllDartsOfValue(1)]);
});

it('it changes players in rotation', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        {
            id: '2',
            name: 'Team 2',
            players: [
                { id: '4', name: 'Player B' },
                { id: '5', name: 'Player C' },
            ],
        },
    ]);

    // Act
    completeTurn(newGame); // Team 1 player 3 complete
    completeTurn(newGame); // Team 2 player 4 complete
    completeTurn(newGame); // Team 1 player 3 complete

    // Assert
    expect(newGame.getCurrentPlayer()).toEqual({
        teamId: '2',
        id: '5',
        dartsThrown: [],
    });
});

it('marks the player as finished when they need 20 and hit 20', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([{ id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] }]);
    throwDarts(newGame, [
        { value: 1, modifier: 3 },
        { value: 4, modifier: 3 },
        { value: 7, modifier: 3 },
        { value: 10, modifier: 3 },
        { value: 13, modifier: 3 },
        { value: 16, modifier: 3 },
        { value: 19, modifier: 1 },
    ]);
    const setupScoreBoard = newGame.getScoreBoard();
    expect(setupScoreBoard).toHaveNextRequiredScores([AllDartsOfValue(20)]);

    // Act
    newGame.dartThrown({ value: 20, modifier: 1 });

    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveNextRequiredScores(['finished']);
});

it('marks the player as finished when they need 19 and hit double 19', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([{ id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] }]);
    throwDarts(newGame, [
        { value: 1, modifier: 3 },
        { value: 4, modifier: 3 },
        { value: 7, modifier: 3 },
        { value: 10, modifier: 3 },
        { value: 13, modifier: 3 },
        { value: 16, modifier: 3 },
    ]);
    const setupScoreBoard = newGame.getScoreBoard();
    expect(setupScoreBoard).toHaveNextRequiredScores([AllDartsOfValue(19)]);

    // Act
    newGame.dartThrown({ value: 19, modifier: 2 });

    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveNextRequiredScores(['finished']);
});

it('marks the player as finished when they need 18 and hit treble 18', () => {
    // Arrange
    const newGame = new RoundTheClock();
    newGame.start([{ id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] }]);
    throwDarts(newGame, [
        { value: 1, modifier: 3 },
        { value: 4, modifier: 3 },
        { value: 7, modifier: 3 },
        { value: 10, modifier: 3 },
        { value: 13, modifier: 3 },
        { value: 16, modifier: 2 },
    ]);
    const setupScoreBoard = newGame.getScoreBoard();
    expect(setupScoreBoard).toHaveNextRequiredScores([AllDartsOfValue(18)]);

    // Act
    newGame.dartThrown({ value: 18, modifier: 3 });

    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveNextRequiredScores(['finished']);
});

function AllDartsOfValue(value: DartBoardSegment): DartScore[] {
    return [
        { value, modifier: 1 },
        { value, modifier: 2 },
        { value, modifier: 3 },
    ];
}

function completeTurn(game: RoundTheClock) {
    throwDarts(game, [{ miss: true }, { miss: true }, { miss: true }]);
}

function throwDarts(game: RoundTheClock, darts: DartScore[]) {
    darts.forEach((dart) => game.dartThrown(dart));
}
