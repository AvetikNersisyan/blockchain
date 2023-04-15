import { Block, TBlock } from './chain/block'
import { Chain, TChain } from './chain/chain'
import { Transaction } from './chain/transaction'
import  { ec as EC} from 'elliptic'

const chain: TChain = new Chain();

const ec  = new EC('secp256k1');

const myKey = ec.genKeyPair();
const anotherKey = ec.genKeyPair();

const anotherAddress = anotherKey.getPublic('hex');

const myAddress = myKey.getPublic('hex');



const transaction = new Transaction(myAddress, anotherAddress, 10)
const transaction1 = new Transaction(anotherAddress, myAddress, 2000)  // trying to transfer to me , this should be invalid.
const transaction2 = new Transaction(anotherAddress, myAddress, 30)

transaction.signTransaction(myKey); // I send someone coins.
transaction1.signTransaction(myKey); // trying to sign other's transactions (should not be done).
transaction2.signTransaction(anotherKey); // someone sends me coins

chain.addTransaction(transaction);
chain.addTransaction(transaction1);
chain.addTransaction(transaction2);


// transactions only confirm after mining pending transactions.
chain.minePendingTransactions(myAddress)
// chain.minePendingTransactions(myAddress)
// chain.minePendingTransactions(myAddress)

const myBalance = chain.getBalance(myAddress);

console.log(myBalance, 'myBalance')
console.log(chain, 'chain')



