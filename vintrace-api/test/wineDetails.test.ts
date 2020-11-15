import { canGetBreakdowns, getBreakdowns, YEAR, BreakdownViewModel, VARIETY, REGION, YEAR_VARIETY, getWineDetails } from '../src/dao';
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
    let result = await getWineDetails((data1 as Breakdown).lotCode);
    expect(result.description).toBe('2011 Yarra Valley Chardonnay');
    expect(result.lotCode).toBe('11YVCHAR001');
    expect(result.owner).toBe('YV Wines Pty Ltd');
    expect(result.productState).toBe('Ready for bottling');
    expect(result.tank).toBe('T25-01');
    expect(result.volume).toBe(1000.0);
	});

	test('It should have data2', async () => {
		let result = await getWineDetails((data2 as Breakdown).lotCode);
    expect(result.description).toBe(null);
    expect(result.lotCode).toBe('11YVCHAR002');
    expect(result.owner).toBe('YV Wines P/L and Vintage Kerr Joint Venture');
    expect(result.productState).toBe(null);
    expect(result.tank).toBe('T25-06');
    expect(result.volume).toBe(5077.0);
	});

	test('It should have data3', async () => {
		let result = await getWineDetails((data3 as Breakdown).lotCode);
    expect(result.description).toBe('2015 Mornington Peninsula Pinot Noir - Vintage Kerr special batch');
    expect(result.lotCode).toBe('15MPPN002-VK');
    expect(result.owner).toBe('Vintage Kerr');
    expect(result.productState).toBe('Filtered');
    expect(result.tank).toBe('T100-03');
    expect(result.volume).toBe(100000.0);
  });
  
  test('It should return null', async () => {
    let result = await getWineDetails('1232');
    expect(result).toBe(null);
  });
});
