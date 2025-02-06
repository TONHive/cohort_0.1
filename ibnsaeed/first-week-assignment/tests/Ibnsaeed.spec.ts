import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Ibnsaeed } from '../wrappers/Ibnsaeed';
import '@ton/test-utils';

describe('Ibnsaeed', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ibnsaeed: SandboxContract<Ibnsaeed>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ibnsaeed = blockchain.openContract(await Ibnsaeed.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ibnsaeed.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ibnsaeed.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ibnsaeed are ready to use
    });
});
