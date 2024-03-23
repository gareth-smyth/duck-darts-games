import { Game } from './game';
import { RoundTheClockFactory } from '../../round-the-clock/round-the-clock-factory';
import { GameName } from './game-name';
import { GameFactory } from './game-factory';

export const Games: Record<GameName, GameFactory<Game>> = {
    [GameName['Round the Clock']]: new RoundTheClockFactory(),
};
