import { Schema } from 'yup';

export default class Configuration {
    constructor(private readonly schema: Schema) {}

    getOptions(value: unknown) {
        return this.schema.describe({ value });
    }

    async validate(value: unknown) {
        return this.schema.validate(value);
    }
}
