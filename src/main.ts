import { Game, GameConfiguration } from './games/common/types/game';
import { Games } from './games/common/types/games';
import { GameName } from './games/common/types/game-name';
import { RoundTheClock } from './games/round-the-clock/round-the-clock';
import { RoundTheClockFactory } from './games/round-the-clock/round-the-clock-factory';
import { GameFactory } from './games/common/types/game-factory';

export default { Games, GameName, RoundTheClock, RoundTheClockFactory };
export { type Game, type GameFactory, type GameConfiguration };
