import { getWineDetails } from "../../dao";
import { getWineDetailSchema } from "./schema";

export default function wineDetailsHandler(app, options, next) {
  app.get(
    '/:lotCode',
    { schema: getWineDetailSchema },
    async (req, res) => {
      req.log.info('processing get winedetails request');
      const { lotCode } = req.params;
      const wineDetails = await getWineDetails(lotCode);
      if (!wineDetails) {
        return res.status(404).send('Not Found');
      }

      res.send(wineDetails);
  });

  next();
};
