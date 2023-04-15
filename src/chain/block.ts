import { log } from 'console';
import SHA256 from 'crypto-js/sha256'

// type TBlock = {
//     timestamp: number;
//     data: string;
//     nonce: number;
//     hash: string;
//     difficulty: number;
// }

export class Block {
    timestamp: number;
    data: string;
    nonce: number;
    hash: string;
    difficulty: number;

    constructor(timestamp: number, data: string, nonce: number) {
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.hash = this.generateHash()
        this.difficulty = 4;
    }

    generateHash(): string {
        return SHA256(this.data + this.nonce + this.timestamp).toString();
    }

    mineBlock(): void {
        while (this.hash.substring(0, this.difficulty) !== new Array(this.difficulty).fill('0').join('')) {
            this.nonce++;
            this.hash = this.generateHash()
        }
    }
}

export type TBlock = InstanceType<typeof Block>;
