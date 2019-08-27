import Ballot from './sidechain/Ballot';

const ballot = new Ballot();

export const giveRightToVote = async (voter) => await ballot.giveRightToVote(voter);
export const delegate = async (to) => await ballot.delegate(to);
export const vote = async (proposal) => await ballot.vote(proposal);
export const winnerName = async () => await ballot.winnerName();
