import Web3 from 'web3';
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js';

const chainId = 'default';
const writeUrl = 'ws://127.0.0.1:46658/websocket';
const readUrl = 'ws://127.0.0.1:46658/queryws';

class SideChain {
  constructor(privateKey) {
    // Read the user private key (from browser storage or input)
    // this.privateKey = CryptoUtils.generatePrivateKey();
    this.privateKey = CryptoUtils.B64ToUint8Array(privateKey);

    // Convert the private key into a public key/account address
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey);

    // Current user addtess
    this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString();
  }

  contract(abi, address) {
    // Connect to a Loom extdev network node
    const client = this.connect();

    // Instantiate a Loom Web3Provider to sign and send transaction
    const web3 = new Web3(new LoomProvider(client, this.privateKey));

    return new web3.eth.Contract(abi, address, { from: this.currentUserAddress })
  }

  connect() {
    const client = new Client(chainId, writeUrl, readUrl);

    client.on('error', msg => {
      console.error('Error on connect to client', msg)
    });

    return client;
  }

  getPublicKey() {
    return this.publicKey;
  }

  getCurrentUserAddress() {
    return this.currentUserAddress;
  }
}

export default SideChain;
