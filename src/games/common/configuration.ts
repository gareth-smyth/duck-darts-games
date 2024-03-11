import { Schema } from 'yup';

export default class Configuration {
    constructor(private readonly schema: Schema) {}

    getOptions(value: unknown) {
        return this.schema.describe({ value });
    }
}
