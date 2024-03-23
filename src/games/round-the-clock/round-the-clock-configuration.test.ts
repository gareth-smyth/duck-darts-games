import Configuration from './round-the-clock-configuration';

it('does something', () => {
    console.log(Configuration.describe());
    console.log(Configuration.describe({ value: { mainGameType: 'Singles' } }));
    console.log(Configuration.describe({ value: { mainGameType: 'Doubles' } }));
});
