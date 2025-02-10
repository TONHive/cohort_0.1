import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { StonesyFirst } from '../wrappers/StonesyFirst';
import '@ton/test-utils';

describe('StonesyFirst', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stonesyFirst: SandboxContract<StonesyFirst>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stonesyFirst = blockchain.openContract(await StonesyFirst.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stonesyFirst.send(
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
            to: stonesyFirst.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stonesyFirst are ready to use
    });
});
