import Counter from './sidechain/Counter';

const counter = new Counter();

export const getCounter = async () => {
  const res = await counter.get();

  console.log('fdfd: ', res);
}

export const incCounter = async () => await counter.increment();
