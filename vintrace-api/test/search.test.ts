import { searchWineDetails } from '../src/dao';
import * as data1 from '../data/11YVCHAR001.json';
import * as data2 from '../data/11YVCHAR002.json';
import * as data3 from '../data/15MPPN002-VK.json';

import BreakdownModel, { Breakdown } from '../src/modules/breakdowns/entity';

describe('WineDetails CRUD', () => {
  const mongoose = require('mongoose');
	let connection;
  let db;
  
  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://localhost:27017/test_', { useNewUrlParser: true, useUnifiedTopology: true });
		db = mongoose.connection;
		await BreakdownModel.create(data1);
		await BreakdownModel.create(data2);
		await BreakdownModel.create(data3);
  });

  afterAll(async () => {
		await db.dropDatabase();
		await db.close();
		await connection.close();
  });

	test('It should have data1', async () => {
    let result = await searchWineDetails('11YV');
    expect(result).toHaveLength(2);
    expect(result[0].lotCode).toBe('11YVCHAR001');
    expect(result[0].description).toBe('2011 Yarra Valley Chardonnay');
    expect(result[1].lotCode).toBe('11YVCHAR002');
    expect(result[1].description).toBe(null);
  });
  
  test('It should have data1', async () => {
    let result = await searchWineDetails('Yarra Valley');
    expect(result).toHaveLength(1);
    expect(result[0].lotCode).toBe('11YVCHAR001');
    expect(result[0].description).toBe('2011 Yarra Valley Chardonnay');
	});
  
  test('It should return null', async () => {
    let result = await searchWineDetails('tensor flow');
    expect(result).toHaveLength(0);
  });
});
