import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MyCounter } from '../wrappers/MyCounter';
import '@ton/test-utils';

describe('MyCounter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let myCounter: SandboxContract<MyCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        myCounter = blockchain.openContract(await MyCounter.fromInit(0n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await myCounter.send(
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
            to: myCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
      
    });

    it('should increase counter', async () => {
        const increaseTimes = 3;
        for (let i = 0; i < increaseTimes; i++) {
            console.log(`increase ${i + 1}/${increaseTimes}`);

            const increaser = await blockchain.treasury('increaser' + i);

            const counterBefore = await myCounter.getCounter();

            console.log('counter before increasing', counterBefore);

            const increaseBy = BigInt(Math.floor(Math.random() * 100));

            console.log('increasing by', increaseBy);

            const increaseResult = await myCounter.send(
                increaser.getSender(),
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'Add',
                    queryId: 0n,
                    amount: increaseBy,
                }
            );

            expect(increaseResult.transactions).toHaveTransaction({
                from: increaser.address,
                to: myCounter.address,
                success: true,
            });

            const counterAfter = await myCounter.getCounter();

            console.log('counter after increasing', counterAfter);

            expect(counterAfter).toBe(counterBefore + increaseBy);
        }
    });
});
