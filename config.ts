
import { Config } from '@ton/blueprint';

export const network = process.env.TESTNET === 'true' ? 'testnet' : 'mainnet';
export const endpoint = network === 'testnet' 
    ? 'https://testnet.toncenter.com/api/v2/jsonRPC' 
    : 'https://mainnet.toncenter.com/api/v2/jsonRPC';