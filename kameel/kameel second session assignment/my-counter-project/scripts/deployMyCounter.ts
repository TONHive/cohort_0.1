import { toNano } from '@ton/core';
import { MyCounter } from '../wrappers/MyCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const myCounter = provider.open(await MyCounter.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await myCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(myCounter.address);

    console.log('ID', await myCounter.getId());
}
