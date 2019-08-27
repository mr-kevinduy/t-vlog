import { randomScalingFactor } from '@/utils/data';

export const gereralDay = (from, to) => {
  const result = [];
  const fromYear = parseInt(from.substring(0, 4), 10);
  const fromMonth = parseInt(from.substring(5, 7), 10);
  const fromDay = parseInt(from.substring(8, 10), 10);
  const toYear = parseInt(to.substring(0, 4), 10);
  const toMonth = parseInt(to.substring(5, 7), 10);
  const toDay = parseInt(to.substring(8, 10), 10);

  for (let y = 0; y < toYear - fromYear + 1; y ++) {
    let mBegin;
    let mEnd;

    if (y === 0) {
      mBegin = fromMonth;
      mEnd = 12;
    } else if (y === toYear - fromYear) {
      mBegin = 1;
      mEnd = toMonth;
    } else {
      mBegin = 1;
      mEnd = 12;
    }
    for (let m = mBegin; m <= mEnd; m++) {
      let dBegin;
      let dEnd;

      if (y === 0 && m === fromMonth) {
        dBegin = fromDay;
        dEnd = 30;
      } else if ((y === toYear - fromYear) && m === toMonth) {
        dBegin = 1;
        dEnd = toDay;
      } else {
        dBegin = 1;
        dEnd = 30;
      }

      for (let d = dBegin; d <= dEnd; d++) {
        const yyyy = (fromYear + y).toString();
        const mm = (m < 10) ? '0' + m.toString() : m.toString();
        const dd = (d < 10) ? '0' + d.toString() : d.toString();

        result.push(yyyy + '/' + mm + '/' + dd);
      }
    }
  }

  return result;
}

export const getOders = async (from, to) => {
  const orders = [];
  const dates = gereralDay(from, to);

  for (let i = 0; i < dates.length; i++) {
    orders.push({
      date: dates[i],
      sale: randomScalingFactor(500000, 800000),
      order: randomScalingFactor()
    });
  }

  return await orders;
}
