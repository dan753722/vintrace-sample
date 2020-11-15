import * as data1 from '../../data/11YVCHAR001.json';
import * as data2 from '../../data/11YVCHAR002.json';
import * as data3 from '../../data/15MPPN002-VK.json';

import BreakdownModel from '../modules/breakdowns/entity';

export default async () => {
  await BreakdownModel.create(data1);
  await BreakdownModel.create(data2);
  await BreakdownModel.create(data3);
};
