import { Team } from './types/team';
import { RoundTheClockScoreBoard } from './types/round-the-clock-score-board';
import { DartScore } from './types/dart-score';
import { CurrentPlayer } from './types/current-player';
import { RoundTheClockScore } from './types/round-the-clock-score';
import {
    DartBoardSegment,
    DartBoardSegmentModifier,
} from './types/dart-board-segment';

export class RoundTheClock {
    private readonly scores: RoundTheClockScore;
    private readonly teams: Team[];
    private currentPlayer: CurrentPlayer;

    constructor(teams: Team[]) {
        this.teams = teams;

        this.scores = teams.map((team) => ({
            team: team.id,
            neededScore: 1,
        }));

        this.currentPlayer = {
            team: teams[0].id,
            player: teams[0].players[0].id,
            dartsThrown: [],
        };
    }

    private getTeamNeededScore(teamId: string): DartBoardSegment {
        return this.getScoreForTeam(teamId).neededScore;
    }

    private getScoreForTeam(teamId: string) {
        return this.scores.find((score) => score.team === teamId)!;
    }

    private updateNeededScore(amount: DartBoardSegmentModifier) {
        const scoreForTeam = this.getScoreForTeam(this.currentPlayer.team);
        scoreForTeam.neededScore += amount;
    }

    start() {}

    getScoreBoard(): RoundTheClockScoreBoard {
        return this.scores.map((score) => ({
            team: score.team,
            nextRequiredScore: [
                { value: score.neededScore, modifier: 1 },
                { value: score.neededScore, modifier: 2 },
                { value: score.neededScore, modifier: 3 },
            ],
        }));
    }

    getCurrentPlayer(): CurrentPlayer {
        return this.currentPlayer;
    }

    private nextPlayer() {
        const currentTeamIdx = this.teams.findIndex(
            (team) => team.id === this.currentPlayer.team,
        )!;

        const nextTeamIndex =
            currentTeamIdx === this.teams.length - 1 ? 0 : currentTeamIdx + 1;

        this.currentPlayer = {
            team: this.teams[nextTeamIndex].id,
            player: this.teams[nextTeamIndex].players[0].id,
            dartsThrown: [],
        };
    }

    dartThrown(dart: DartScore) {
        this.currentPlayer.dartsThrown.push(dart);
        if ('value' in dart) {
            const neededScore = this.getTeamNeededScore(
                this.currentPlayer.team,
            );
            if (neededScore === dart.value) {
                this.updateNeededScore(dart.modifier);
            }
        }

        if (this.currentPlayer.dartsThrown.length === 3) {
            this.nextPlayer();
        }
    }
}
