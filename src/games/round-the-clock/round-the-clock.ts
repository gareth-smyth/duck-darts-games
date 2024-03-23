import { Team } from '../common/types/team';
import { RoundTheClockScoreBoard } from './types/round-the-clock-score-board';
import { DartScore } from '../common/types/dart-score';
import { CurrentPlayer } from '../common/types/current-player';
import { RoundTheClockScore } from './types/round-the-clock-score';
import { DartBoardSegment, DartBoardSegmentModifier } from '../common/types/dart-board-segment';
import { Finished, Game, GameConfiguration } from '../common/types/game';
import { GameType } from './round-the-clock-configuration';
import { GameName } from '../common/types/game-name';

export class RoundTheClock implements Game {
    private scores: RoundTheClockScore = [];
    private teams: Team[] = [];
    private currentPlayer: CurrentPlayer = { teamId: '', id: '', dartsThrown: [] };
    private lastPlayers: Record<string, number> = {};
    private readonly singleValue: number = 0;
    private readonly doubleValue: number = 0;
    private readonly trebleValue: number = 0;

    constructor(
        validatedConfiguration: GameConfiguration = {
            mainGameType: GameType.Singles,
            doublesAndTreblesCountExtra: true,
        },
    ) {
        if (validatedConfiguration.mainGameType === GameType.Singles) {
            this.singleValue = 1;
            if (validatedConfiguration.doublesAndTreblesCountExtra) {
                this.doubleValue = 2;
                this.trebleValue = 3;
            }
        } else if (validatedConfiguration.mainGameType === GameType.Doubles) {
            this.doubleValue = 1;
        } else if (validatedConfiguration.mainGameType === GameType.Trebles) {
            this.trebleValue = 1;
        }
    }

    getName(): GameName {
        return GameName['Round the Clock'];
    }

    start(teams: Team[]) {
        this.teams = teams;
        this.scores = teams.map((team) => ({
            team: team.id,
            neededScore: 1,
        }));

        this.lastPlayers = {};

        this.currentPlayer = {
            teamId: teams[0].id,
            id: teams[0].players[0].id,
            dartsThrown: [],
        };
    }

    getScoreBoard(): RoundTheClockScoreBoard {
        return this.scores.map((score) => {
            if (score.neededScore === 'finished') {
                return {
                    team: score.team,
                    nextRequiredScore: 'finished',
                };
            } else {
                const nextRequiredScore: {
                    value: DartBoardSegment;
                    modifier: DartBoardSegmentModifier;
                }[] = [];
                this.singleValue &&
                    nextRequiredScore.push({ value: score.neededScore, modifier: 1 });
                this.doubleValue &&
                    nextRequiredScore.push({ value: score.neededScore, modifier: 2 });
                this.trebleValue &&
                    nextRequiredScore.push({ value: score.neededScore, modifier: 3 });
                return {
                    team: score.team,
                    nextRequiredScore,
                };
            }
        });
    }

    getCurrentPlayer(): CurrentPlayer {
        return this.currentPlayer;
    }

    dartThrown(dart: DartScore) {
        this.currentPlayer.dartsThrown.push(dart);
        if ('value' in dart) {
            const neededScore = this.getTeamNeededScore(this.currentPlayer.teamId);
            if (neededScore === dart.value) {
                this.updateNeededScore(this.getModifierScoreFromOptions(dart.modifier));
            }
        }

        if (this.currentPlayer.dartsThrown.length === 3) {
            this.nextPlayer();
        }
    }

    private getModifierScoreFromOptions(modifier: DartBoardSegmentModifier): number {
        switch (modifier) {
            case 1:
                return Number(this.singleValue);
            case 2:
                return Number(this.doubleValue);
            case 3:
                return Number(this.trebleValue);
        }
    }

    private getTeamNeededScore(teamId: string): DartBoardSegment | Finished {
        return this.getScoreForTeam(teamId).neededScore;
    }

    private getScoreForTeam(teamId: string) {
        return this.scores.find((score) => score.team === teamId)!;
    }

    private updateNeededScore(amount: number) {
        const scoreForTeam = this.getScoreForTeam(this.currentPlayer.teamId);
        if (scoreForTeam.neededScore !== 'finished') {
            if (scoreForTeam.neededScore + amount > 20) {
                scoreForTeam.neededScore = 'finished';
            } else {
                scoreForTeam.neededScore += amount;
            }
        }
    }

    private nextPlayer() {
        const currentTeamIndex = this.teams.findIndex(
            (team) => team.id === this.currentPlayer.teamId,
        )!;
        const currentTeam = this.teams[currentTeamIndex];

        this.lastPlayers[this.currentPlayer.teamId] = currentTeam.players.findIndex(
            (player) => player.id === this.currentPlayer.id,
        )!;

        const nextTeamIndex = currentTeamIndex === this.teams.length - 1 ? 0 : currentTeamIndex + 1;
        const nextTeam = this.teams[nextTeamIndex];

        const lastPlayerIndex = this.lastPlayers[nextTeam.id] ?? nextTeam.players.length - 1;
        const nextPlayerIndex =
            lastPlayerIndex === nextTeam.players.length - 1 ? 0 : lastPlayerIndex + 1;

        this.currentPlayer = {
            teamId: nextTeam.id,
            id: nextTeam.players[nextPlayerIndex].id,
            dartsThrown: [],
        };
    }
}
