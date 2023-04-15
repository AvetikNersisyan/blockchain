import { Block } from "./block";

import { TBlock } from "./block";

export class Chain {
    chain: TBlock[]
    constructor() {
        this.chain = [new Block(Date.now(), '', 3)]
        this.chain[0]


    }
}

