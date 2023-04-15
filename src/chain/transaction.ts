import  { ec as EC} from 'elliptic'
import SHA256 from 'crypto-js/sha256'
const ec =  new EC('secp256k1');


export class Transaction {
  from: string | null
  to: string
  amount: number
  signature: string

  constructor(from: string | null, to: string, amount: number) {
    this.from = from
    this.to = to
    this.amount = amount
    this.signature = ''
  }

  private genTransactionHash () {
    return SHA256(this.from + this.to + this.amount)
  }

  signTransaction (key: EC.KeyPair ) {
    if( key.getPublic('hex') !== this.from) {
        return new Error('You are not allowed to sign other\'s transaction');
    }


    const msgHash = this.genTransactionHash();

    const sig = key.sign(msgHash.toString(), 'base64');
    this.signature = sig.toDER('hex')


  }

  isValidSignature () {
    // means that transaction is from mining
    if(this.from === null) {
      return  true;
    }

    if(!this.signature) {
      return false;
    }

    const publicKey = ec.keyFromPublic(this.from || '', 'hex')
    return publicKey.verify(this.genTransactionHash().toString(), this.signature)
  }

}


export type TTransaction = InstanceType< typeof Transaction>;
