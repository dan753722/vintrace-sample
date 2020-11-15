import { searchWineDetails } from '../../dao';
import { searchWineDetailsSchema } from './schema';

export default function searchHandler(app, options, next) {
  app.get(
    '/',
    { schema: searchWineDetailsSchema },
    async (req, res) => {
      req.log.info('processing search request');
      const { filter } = req.query;
      const searchResults = await searchWineDetails(filter);
      res.send(searchResults);
  });

  next();
};
