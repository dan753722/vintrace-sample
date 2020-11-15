import { canGetBreakdowns, getBreakdowns, YEAR, BreakdownViewModel, VARIETY, REGION, YEAR_VARIETY } from '../src/dao';
import * as data1 from '../data/11YVCHAR001.json';
import * as data2 from '../data/11YVCHAR002.json';
import * as data3 from '../data/15MPPN002-VK.json';

import BreakdownModel, { Breakdown } from '../src/modules/breakdowns/entity';

describe('Breakdown CRUD', () => {
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
		expect(await BreakdownModel.countDocuments({ lotCode: (data1 as Breakdown).lotCode})).toBe(1);
	});

	test('It should have data2', async () => {
		expect(await BreakdownModel.countDocuments({ lotCode: (data2 as Breakdown).lotCode})).toBe(1);
	});

	test('It should have data3', async () => {
		expect(await BreakdownModel.countDocuments({ lotCode: (data3 as Breakdown).lotCode})).toBe(1);
	});

	describe('canGetBreadowns', () => {
		test('It should error bad request', async () => {
			const result = await canGetBreakdowns('code', (data3 as Breakdown).lotCode);
			expect(result).toHaveLength(1);
			expect(result[0].code).toBe(400);
			expect(result[0].message).toBe('Bad Request');
		});

		test('It should error 404', async () => {
			const result = await canGetBreakdowns(YEAR, '111NDNSL');
			expect(result).toHaveLength(1);
			expect(result[0].code).toBe(404);
			expect(result[0].message).toBe('Not Found');
		});

		test('It should pass', async () => {
			const result = await canGetBreakdowns(YEAR, (data3 as Breakdown).lotCode);
			expect(result).toHaveLength(0);
		});
	});

	describe('getBreakdowns', () => {
		test('It should get breakdown by year', async () => {
			const result = await getBreakdowns(YEAR, (data1 as Breakdown).lotCode);
			expect(result.breakdownType).toBe('year');
			expect(result.breakdown).toHaveLength(2);
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2011' && item.percentage === '85')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2010' && item.percentage === '15')).toBeDefined();
		});
		test('It should get breakdown by variety', async () => {
			const result = await getBreakdowns(VARIETY, (data1 as Breakdown).lotCode);
			expect(result.breakdownType).toBe('variety');
			expect(result.breakdown).toHaveLength(2);
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === 'Pinot Noir' && item.percentage === '10')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === 'Chardonnay' && item.percentage === '90')).toBeDefined();
		});

		test('It should get breakdown by region', async () => {
			const result = await getBreakdowns(REGION, (data1 as Breakdown).lotCode);
			expect(result.breakdownType).toBe('region');
			expect(result.breakdown).toHaveLength(3);
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === 'Mornington' && item.percentage === '5')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === 'Yarra Valley' && item.percentage === '80')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === 'Macedon' && item.percentage === '15')).toBeDefined();
		});

		test('It should get breakdown by year-variety', async () => {
			const result = await getBreakdowns(YEAR_VARIETY, (data1 as Breakdown).lotCode);
			expect(result.breakdownType).toBe('year-variety');
			expect(result.breakdown).toHaveLength(4);
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2011-Pinot Noir' && item.percentage === '5')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2011-Chardonnay' && item.percentage === '80')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2010-Pinot Noir' && item.percentage === '5')).toBeDefined();
			expect(result.breakdown.find((item: BreakdownViewModel) => item.key === '2010-Chardonnay' && item.percentage === '10')).toBeDefined();
		});
	})
});
