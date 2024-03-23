import { AnyObjectSchema } from 'yup';
import { GameName } from './game-name';
import { Game, GameConfiguration } from './game';

export interface GameFactory<T extends Game> {
    getOptions: () => AnyObjectSchema;
    getName: () => GameName;
    newGame: (configuration: GameConfiguration) => T;
}
