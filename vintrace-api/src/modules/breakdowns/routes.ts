import { canGetBreakdowns, getBreakdowns } from '../../dao/index';
import { getBreakdownsSchema } from './schema';

export default function breakdownHandler(app, options, next) {
  app.get(
    '/:breakdownType/:lotCode',
    { schema: getBreakdownsSchema },
    async (req, res) => {
      req.log.info('processing breakdown request');
      const { breakdownType, lotCode } = req.params;
      const result = await canGetBreakdowns(breakdownType, lotCode);
      if (result.length > 0) {
        return res.status(result[0].code).send(result[0].message);
      }
      const breakdowns = await getBreakdowns(breakdownType, lotCode);
      res.send(breakdowns);
  });

  next();
};
