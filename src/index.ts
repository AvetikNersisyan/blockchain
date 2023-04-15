import { Block, TBlock } from './chain/block'
import { Chain, TChain } from './chain/chain'
import { Transaction } from './chain/transaction'

const chain: TChain = new Chain();

const transaction = new Transaction('myaddres', 'youraddress', 20)
chain.addTransaction(transaction);

chain.minePendingTransactions('rewardaddress')
chain.minePendingTransactions('rewardaddress')
chain.minePendingTransactions('rewardaddress')



const balance = chain.getBalance('rewardaddress');


console.log(JSON.stringify(chain, null, 2))
console.log(balance, 'myaddres')
