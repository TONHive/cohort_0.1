import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CounterContract } from '../wrappers/CounterContract';
import '@ton/test-utils';

describe('CounterContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let counterContract: SandboxContract<CounterContract>;

    beforeEach(async () => {
        
        blockchain = await Blockchain.create();

        
        deployer = await blockchain.treasury('deployer');

        counterContract = blockchain.openContract(
            await CounterContract.fromInit(123n) 
        );

        
        await counterContract.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Increment', amount: 0n }
        );
    });





    it('should deploy and initial value should be 0', async () => {
       
        const value = await counterContract.getValue();
        expect(value).toBe(0n);
    });

    it('should increment counter', async () => {
      
        const user = await blockchain.treasury('user');
        
       
        await counterContract.send(
            user.getSender(),
            { value: toNano('0.1') },
            { $$type: 'Increment', amount: 5n }
        );

       
        const value = await counterContract.getValue();
        expect(value).toBe(5n);
    });
});