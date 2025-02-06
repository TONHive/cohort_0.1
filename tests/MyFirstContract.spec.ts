import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MyFirstContract } from '../wrappers/MyFirstContract';
import '@ton/test-utils';

describe('MyFirstContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let myFirstContract: SandboxContract<MyFirstContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        myFirstContract = blockchain.openContract(await MyFirstContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await myFirstContract.send(
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
            to: myFirstContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and myFirstContract are ready to use
    });
});
