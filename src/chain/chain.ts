import { Block, TBlock } from './block'
import { Transaction, TTransaction } from './transaction'


export class Chain {
  readonly chain: TBlock[]
  private readonly difficulty: number
  private readonly reward: number

  pendingTransactions: TTransaction[];

  constructor() {
    this.chain = [Chain.genesisBlock()]
    this.difficulty = 2
    this.reward = 100;
    this.pendingTransactions = [];
  }

  private static genesisBlock() {
    const genesisTransaction = new Transaction(null, 'genesis', 0)
    const genesisTime = new Date(2023,3,15).getTime() / 1000
    return new Block(
      genesisTime, [genesisTransaction], null)
  }

  private getLatestBlock() {
    return this.chain.at(-1)
  }

  minePendingTransactions(rewardAddress: string) {
    const block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    block.previousHash = this.getLatestBlock()!.hash
    this.chain.push(block)

    const rewardTransaction = new Transaction(null, rewardAddress, this.reward)
    this.pendingTransactions = [
      rewardTransaction
    ];
  }

  getBalance (address: string) {
    let balance = 0;
    for(let i = 1; i< this.chain.length; i++){
      const block: TBlock = this.chain[i];
      for(const transaction of block.transactions) {
        if(transaction.from === address){
            balance -= transaction.amount;
        }
        if (transaction.to === address) {
            balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  addTransaction (transaction: TTransaction) {
    this.pendingTransactions.push(transaction);
  }


  isValidChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]
      if (currentBlock.generateHash() !== currentBlock.hash) {
        return false
      }
      if (currentBlock.previousHash !== prevBlock.hash) {
        return false
      }
    }
    return true
  }

}


export type TChain = InstanceType<typeof Chain>
