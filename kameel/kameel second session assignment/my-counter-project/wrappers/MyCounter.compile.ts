import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/my_counter.tact',
    options: {
        debug: true,
    },
};
