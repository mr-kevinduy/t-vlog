import SideChain from './index';
import { privateKey, currentNetwork } from './data';
import { abi, networks } from './contracts/Ballot.json';

const sideChain = new SideChain(privateKey);

class Ballot {
  constructor() {
    this.address = networks[currentNetwork].address;
    this.contract = sideChain.contract(abi, this.address);
  }

  async giveRightToVote(voter) {
    return await this.contract.methods.giveRightToVote(voter).call();
  }

  async delegate(to) {
    return await this.contract.methods.delegate(to).send();
  }

  async vote(proposal) {
    return await this.contract.methods.vote().send(proposal);
  }

  async winnerName() {
    return await this.contract.methods.winnerName().send();
  }
}

export default Ballot;
