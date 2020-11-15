import * as data1 from '../../data/11YVCHAR001.json';
import * as data2 from '../../data/11YVCHAR002.json';
import * as data3 from '../../data/15MPPN002-VK.json';

import BreakdownModel from '../modules/breakdowns/entity';

export default async () => {
  const result = await BreakdownModel.countDocuments({ lotCode: {$in: [data1.lotCode, data2.lotCode, data3.lotCode]} });
  console.log('>>> result', result);
  if (result === 0 && process.env.NODE_ENV === 'dev') {
    await BreakdownModel.create(data1);
    await BreakdownModel.create(data2);
    await BreakdownModel.create(data3);
  }
};
