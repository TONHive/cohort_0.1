import 'dotenv/config';
import { TonClient, WalletContractV4, beginCell, toNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { CounterContract } from "../wrappers/CounterContract";
import { network, endpoint } from "../config";

async function main() {
    const client = new TonClient({ endpoint });
    
    // Load wallet
    const mnemonic = process.env.MNEMONIC!.split(' ');
    const key = await mnemonicToPrivateKey(mnemonic);
    const wallet = WalletContractV4.create({ 
        publicKey: key.publicKey, 
        workchain: 0 
    });
    
    // Prepare contract
    const contract = await CounterContract.fromInit(123n);
    
    // Create deployment message
    const deploymentMessage = beginCell()
        .storeUint(0, 32) // op code
        .endCell();

    // Get wallet contract
    const openedWallet = client.open(wallet);
    const seqno = await openedWallet.getSeqno();
    
    // Send deployment transaction
    await openedWallet.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [{
            info: {
                type: 'internal',
                ihrDisabled: true,
                bounce: true,
                bounced: false,
                ihrFee: 0n,
                forwardFee: 0n,
                createdLt: 0n, // Logical time
                createdAt: Math.floor(Date.now() / 1000), // Unix timestamp
                dest: contract.address,
                value: { coins: toNano('0.5') }
            },
            body: deploymentMessage
        }]
    });

    // Wait for transaction completion
    let currentSeqno = seqno;
    while (currentSeqno === seqno) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        currentSeqno = await openedWallet.getSeqno();
    }

    console.log(`✅ Contract deployed at: ${contract.address.toString()}`);
    console.log(`🔗 Explorer link: https://testnet.tonscan.org/address/${contract.address.toString()}`);
    console.log('MNEMONIC loaded:', process.env.MNEMONIC ? 'Yes' : 'No');
console.log('TESTNET mode:', process.env.TESTNET);
}

main().catch(console.error);