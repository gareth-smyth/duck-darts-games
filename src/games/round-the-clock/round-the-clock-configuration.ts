import Configuration from '../common/configuration';
import { boolean, mixed, object, Schema } from 'yup';

export enum GameType {
    Singles,
    Doubles,
    Trebles,
}

class NotAllowedType extends Schema {}

export interface RoundTheClockConfiguration {
    mainGameType: GameType;
    doublesAndTreblesCountExtra?: boolean;
}

export default new Configuration(
    object<RoundTheClockConfiguration>({
        mainGameType: mixed<GameType>()
            .oneOf(Object.values(GameType) as GameType[])
            .default(GameType.Singles)
            .required(),
        doublesAndTreblesCountExtra: boolean().when('mainGameType', {
            is: GameType.Singles,
            then: (doublesAndTreblesCountExtra) =>
                doublesAndTreblesCountExtra.required().default(true),
            otherwise: () =>
                new NotAllowedType({
                    type: 'not_allowed',
                    check: (value): value is NonNullable<undefined> => value === null,
                }),
        }),
    }),
);
