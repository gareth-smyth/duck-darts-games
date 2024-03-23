import { GameConfiguration } from '../common/types/game';
import { GameName } from '../common/types/game-name';
import Options from './round-the-clock-configuration';
import { RoundTheClock } from './round-the-clock';
import { GameFactory } from '../common/types/game-factory';
import { AnyObjectSchema } from 'yup';

export class RoundTheClockFactory implements GameFactory<RoundTheClock> {
    getName(): GameName {
        return GameName['Round the Clock'];
    }

    getOptions(): AnyObjectSchema {
        return Options;
    }

    newGame(validatedConfiguration: GameConfiguration) {
        return new RoundTheClock(validatedConfiguration);
    }
}
