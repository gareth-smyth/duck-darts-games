import {RoundTheClock} from "./round-the-clock";
import {GameStatus} from "./types/game-status";
import {RoundTheClockScoreBoard} from "./types/RoundTheClockScoreBoard";

it('starts a game with a fresh score board', () => {
  const newGame = new RoundTheClock([
    {id: '1', name: 'Team 1', players: [{id: '3', name: 'Player A'}]},
    {id: '2', name: 'Team 2', players: [{id: '4', name: 'Player B'}]},
  ]);

  newGame.startGame();

  expect(newGame.status).toEqual(GameStatus.IN_PROGRESS);
  expect(newGame.getScoreBoard()).toEqual<RoundTheClockScoreBoard>({
    scores: [
      {team: '1', nextRequiredScore: [{value: 1, modifier: 1}, {value: 1, modifier: 2}, {value: 1, modifier: 3}]},
      {team: '2', nextRequiredScore: [{value: 1, modifier: 1}, {value: 1, modifier: 2}, {value: 1, modifier: 3}]},
    ]
  });
});
