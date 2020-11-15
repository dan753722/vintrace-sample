export const wineSearchResultSchema = {
  lotCode: { type: 'string' },
  description: { type: 'string' },
  volume: { type: 'number' },
  tank: { type: 'string' },
};

export const searchWineDetailsSchema = {
  summary: 'wine details search result',
  descrition: 'search for wine details',
  querystring: {
    filter: {
      type: 'string',
      description: 'search by lotCode or description',
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        properties: wineSearchResultSchema,
      }
    },
  },
};
