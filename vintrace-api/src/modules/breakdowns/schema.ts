export const breakdownSchema = {
  percentage: { type: 'string' },
  key: { type: 'string' },
};

export const breakdownsSchema = {
  breakdownType: { type: 'string' },
  breakdown: {
    type: 'array',
    items: {
      properties: breakdownSchema,
    },
  },
};

export const getBreakdownsSchema = {
  summary: 'percentage breakdowns',
  description: 'breakdowns',
  params: {
    type: 'object',
    required: ['breakdownType', 'lotCode'],
    properties: {
      breakdownType: { type: 'string' },
      lotCode: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: breakdownsSchema,
    },
  },
};
