import { toNano } from '@ton/core';
import { StonesyFirst } from '../wrappers/StonesyFirst';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stonesyFirst = provider.open(await StonesyFirst.fromInit());

    await stonesyFirst.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stonesyFirst.address);

    // run methods on `stonesyFirst`
}
