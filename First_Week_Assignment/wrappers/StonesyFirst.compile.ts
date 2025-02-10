import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/stonesyfirst.tact',
    options: {
        debug: true,
    },
};
