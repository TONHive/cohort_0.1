import { toNano } from '@ton/core';
import { Ibnsaeed } from '../wrappers/Ibnsaeed';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ibnsaeed = provider.open(await Ibnsaeed.fromInit());

    await ibnsaeed.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ibnsaeed.address);

    // run methods on `ibnsaeed`
}
