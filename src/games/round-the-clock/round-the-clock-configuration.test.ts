import RoundTheClockConfiguration, { GameType } from './round-the-clock-configuration';
import { SchemaObjectDescription } from 'yup';

it('returns a configuration with the game type', () => {
    const options = RoundTheClockConfiguration.getOptions({
        mainGameType: GameType.Doubles,
    }) as SchemaObjectDescription;
    console.log(options.fields);
});
