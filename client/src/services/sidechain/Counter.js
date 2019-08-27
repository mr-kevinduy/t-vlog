import SideChain from './index';
import { privateKey, currentNetwork } from './data';
import { abi, networks } from './contracts/Counter.json';

const sideChain = new SideChain(privateKey);

class Counter {
  constructor() {
    this.address = networks[currentNetwork].address;
    this.contract = sideChain.contract(abi, this.address);
  }

  getAddress() {
    return this.address;
  }

  async get() {
    return await this.contract.methods.getCounter().call();
  }

  async increment() {
    return await this.contract.methods.increment().send();
  }
}

export default Counter;
