import { Block, TBlock } from './chain/block'
import { Chain, TChain } from './chain/chain'
import { Transaction } from './chain/transaction'
import  { ec as EC} from 'elliptic'

const chain: TChain = new Chain();

const ec  = new EC('secp256k1');

const myKey = ec.genKeyPair();

const myAddress = myKey.getPublic('hex');



const transaction = new Transaction(myAddress, 'your public address', 10)

transaction.signTransaction(myKey);
chain.addTransaction(transaction);

chain.minePendingTransactions(myAddress)
chain.minePendingTransactions(myAddress)
chain.minePendingTransactions(myAddress)

const myBalance = chain.getBalance(myAddress);

console.log(myBalance, 'myBalance')



