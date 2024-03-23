import { boolean, object, Schema, string } from 'yup';
import { GameConfiguration } from '../common/types/game';

export enum GameType {
    Singles = 'Singles',
    Doubles = 'Doubles',
    Trebles = 'Trebles',
}

class NotAllowedType extends Schema {}

export interface RoundTheClockConfiguration extends GameConfiguration {
    mainGameType: GameType;
    doublesAndTreblesCountExtra?: boolean;
}

export default object<RoundTheClockConfiguration>({
    mainGameType: string<GameType>()
        .label('Game type')
        .oneOf(Object.values(GameType) as GameType[])
        .default(GameType.Singles)
        .required(),
    doublesAndTreblesCountExtra: boolean()
        .label('Doubles and Trebles skip')
        .default(true)
        .when('mainGameType', {
            is: GameType.Singles,
            then: (doublesAndTreblesCountExtra) =>
                doublesAndTreblesCountExtra.required().default(true),
            otherwise: () =>
                new NotAllowedType({
                    type: 'not_allowed',
                    check: (value): value is NonNullable<undefined> => value === null,
                }),
        }),
});
