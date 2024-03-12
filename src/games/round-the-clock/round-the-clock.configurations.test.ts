import { RoundTheClock } from './round-the-clock';
import { GameType } from './round-the-clock-configuration';

it('handles a game where only trebles count, and they count as one.', async () => {
    // Arrange
    const newGame = new RoundTheClock();
    await newGame.configure({ mainGameType: GameType.Trebles });
    newGame.start([{ id: '1', name: 'Team 1', players: [{ id: '3', name: 'Player A' }] }]);

    // Act
    // Hit single and double of needed number and treble of other number
    newGame.dartThrown({ value: 1, modifier: 1 });
    newGame.dartThrown({ value: 1, modifier: 2 });
    newGame.dartThrown({ value: 2, modifier: 3 });

    // Assert
    expect(newGame.getScoreBoard()).toHaveNextRequiredScores([[{ value: 1, modifier: 3 }]]);

    // Act
    // Hit treble of needed number
    newGame.dartThrown({ value: 1, modifier: 1 });
    newGame.dartThrown({ value: 1, modifier: 2 });
    newGame.dartThrown({ value: 1, modifier: 3 });

    // Assert
    expect(newGame.getScoreBoard()).toHaveNextRequiredScores([[{ value: 2, modifier: 3 }]]);
});
