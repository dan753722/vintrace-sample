export const wineDetailsSchema = {
  lotCode: { type: 'string' },
  description: { type: 'string' },
  volume: { type: 'number' },
  tank: { type: 'string' },
  productState: { type: 'string' },
  owner: { type: 'string' },
};

export const getWineDetailSchema = {
  summary: 'wine details',
  descrition: 'get wine details by lot code',
  params: {
    type: 'object',
    required: ['lotCode'],
    properties: {
      lotCode: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: wineDetailsSchema,
    },
  },
};
