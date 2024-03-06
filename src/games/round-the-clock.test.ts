import { RoundTheClock } from './round-the-clock';
import { DartBoardSegment } from './types/dart-board-segment';
import { DartScore } from './types/dart-score';

it('starts a game with a fresh score board', () => {
    // Arrange
    const newGame = new RoundTheClock([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);

    // Act
    newGame.start();

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(scoreBoard).toHaveScores([AllDartsOfValue(1), AllDartsOfValue(1)]);
    expect(newGame.getCurrentPlayer()).toEqual({
        team: '1',
        player: '3',
        dartsThrown: [],
    });
});

it('it updates the score after a dart', () => {
    // Arrange
    const newGame = new RoundTheClock([
        { id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] },
        { id: '2', name: 'Team 2', players: [{ id: '4', name: 'Player B' }] },
    ]);
    newGame.start();

    // Act
    newGame.dartThrown({ value: 1, modifier: 1 });

    // Assert
    const scoreBoard = newGame.getScoreBoard();
    expect(scoreBoard).toHaveTeams(['1', '2']);
    expect(newGame.getCurrentPlayer()).toEqual({
        team: '1',
        player: '3',
        dartsThrown: [{ value: 1, modifier: 1 }],
    });
    expect(scoreBoard).toHaveScores([AllDartsOfValue(2), AllDartsOfValue(1)]);
});

function AllDartsOfValue(value: DartBoardSegment): DartScore[] {
    return [
        { value, modifier: 1 },
        { value, modifier: 2 },
        { value, modifier: 3 },
    ];
}
