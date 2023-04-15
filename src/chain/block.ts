import SHA256 from 'crypto-js/sha256'
import { TTransaction } from './transaction'


export class Block {
    private  nonce: number;

    timestamp: number;
    transactions: TTransaction[];
    hash: string;
    previousHash: string | null | undefined;

    constructor(timestamp: number, transactions: TTransaction[], previousHash?: string | null) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.generateHash()
        this.previousHash = previousHash
    }

    generateHash(): string {
        return SHA256(JSON.stringify(this.transactions) + this.nonce + this.timestamp).toString();
    }

    mineBlock(difficulty: number): void {
        while (this.hash.substring(0, difficulty) !== new Array(difficulty).fill('0').join('')) {
            this.nonce++;
            this.hash = this.generateHash()
        }
    }

}

export type TBlock = InstanceType<typeof Block>;
