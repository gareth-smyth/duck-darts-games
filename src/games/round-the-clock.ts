import {GameStatus} from "./types/game-status";
import {Team} from "./types/team";
import {RoundTheClockScoreBoard} from "./types/round-the-clock-score-board";

export class RoundTheClock {
  private readonly scoreBoard: RoundTheClockScoreBoard;
  status: GameStatus = GameStatus.WAITING_TO_START;

  constructor(teams: Team[]) {
    const initialScores = teams.map(team => ({
      team: team.id,
      nextRequiredScore: [
        { value: 1, modifier: 1},
        { value: 1, modifier: 2},
        { value: 1, modifier: 3}
      ],
    }));

    this.scoreBoard = {
      scores: initialScores,
    }
  }

  startGame() {
    this.status = GameStatus.IN_PROGRESS;
  }

  getScoreBoard() : RoundTheClockScoreBoard {
    return this.scoreBoard;
  }
}
