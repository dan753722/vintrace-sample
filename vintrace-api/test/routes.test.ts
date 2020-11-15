import * as data1 from '../data/11YVCHAR001.json';
import * as data2 from '../data/11YVCHAR002.json';
import * as data3 from '../data/15MPPN002-VK.json';

import BreakdownModel from '../src/modules/breakdowns/entity';

describe('Breakdown CRUD', () => {
	const mongoose = require('mongoose');
	let server;
	let connection;
	let db;

	beforeAll(async () => {
		connection = await mongoose.connect('mongodb://localhost:27017/test_', { useNewUrlParser: true, useUnifiedTopology: true });
		db = mongoose.connection;
		await BreakdownModel.create(data1);
		await BreakdownModel.create(data2);
		await BreakdownModel.create(data3);
		server = await require('../src/index');
		await server.ready();
	});

	afterAll(async () => {
		await db.dropDatabase();
		await db.close();
		await connection.close();
		server.close();
	});

	test('Get breakdown by year Breakdown GET /breakdown/:breakdownType/:lotCode', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: `breakdown/year/${data1.lotCode}`,
		});
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('{\"breakdownType\":\"year\",\"breakdown\":[{\"percentage\":\"85\",\"key\":\"2011\"},{\"percentage\":\"15\",\"key\":\"2010\"}]}');
		done();
	});

	test('Health Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/health',
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Wine Details Get Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: `wine-detail/${data1.lotCode}`,
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toBe('{\"lotCode\":\"11YVCHAR001\",\"description\":\"2011 Yarra Valley Chardonnay\",\"volume\":1000,\"tank\":\"T25-01\",\"productState\":\"Ready for bottling\",\"owner\":\"YV Wines Pty Ltd\"}');
		done();
	});

	test('Wine Search by lotCode GET Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: `search?filter=11YV`,
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toBe('[{\"lotCode\":\"11YVCHAR001\",\"description\":\"2011 Yarra Valley Chardonnay\"},{\"lotCode\":\"11YVCHAR002\",\"description\":\"\"}]');
		done();
	});

	test('Wine Search by description GET Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: `search?filter=${encodeURIComponent('Yarra Valley')}`,
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toBe('[{\"lotCode\":\"11YVCHAR001\",\"description\":\"2011 Yarra Valley Chardonnay\"}]');
		done();
	});
});