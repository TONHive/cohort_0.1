import { toNano } from '@ton/core';
import { MyFirstContract } from '../wrappers/MyFirstContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const myFirstContract = provider.open(await MyFirstContract.fromInit());

    await myFirstContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(myFirstContract.address);

    // run methods on `myFirstContract`
}
