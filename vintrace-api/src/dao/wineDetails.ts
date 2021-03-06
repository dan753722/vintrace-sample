import BreakdownModel, { BreakdownDocument, Component } from '../modules/breakdowns/entity';

export interface BreakdownViewModel {
  percentage: string;
  key: string;
};

export interface BreakdownsViewModel {
  breakdownType: string;
  breakdown: BreakdownViewModel[];
};

export interface WineDetailsViewModel {
  lotCode: string;
  description: string;
  volume: number;
  tank: string;
  productState: string;
  owner: string;
};

export interface WineSearchResultViewModel {
  lotCode: string;
  description: string;
  volume: number,
  tank: string,
}

export interface ValidationErrorViewModel {
  code: number;
  message: string;
};

// breakdown types
export const YEAR = 'year';
export const VARIETY = 'variety';
export const REGION = 'region';
export const YEAR_VARIETY = 'year-variety';
export const breakdownTypes = [YEAR, VARIETY, REGION, YEAR_VARIETY];
//

const buildBreakdownsViewModel = (breakdownType: string, components: Component[]): BreakdownsViewModel => {
  let breakdownReducer;
  if (breakdownType === YEAR) {
    breakdownReducer = components.reduce((result, component: Component) => {
      if (result[component.year]) {
        result[component.year] += component.percentage;
      }
      else {
        result[component.year] = component.percentage;
      }

      return result;
    }, {});
  }
  else if (breakdownType === VARIETY) {
    breakdownReducer = components.reduce((result, component: Component) => {
      if (result[component.variety]) {
        result[component.variety] += component.percentage;
      }
      else {
        result[component.variety] = component.percentage;
      }

      return result;
    }, {});
  }
  else if (breakdownType === REGION) {
    breakdownReducer = components.reduce((result, component: Component) => {
      if (result[component.region]) {
        result[component.region] += component.percentage;
      }
      else {
        result[component.region] = component.percentage;
      }

      return result;
    }, {});
  } else if (breakdownType === YEAR_VARIETY) {
    breakdownReducer = components.reduce((result, component: Component) => {
      const key = `${component.year} - ${component.variety}`;
      if (result[key]) {
        result[key] += component.percentage;
      }
      else {
        result[key] = component.percentage;
      }

      return result;
    }, {});
  }

  if (breakdownReducer) {
    return {
      breakdownType,
      breakdown: Object.keys(breakdownReducer).map(key => ({
        percentage: breakdownReducer[key].toString(),
        key: key.toString(),
      })).sort((a, b) => -1*(a.percentage - b.percentage)),
    };
  }

  throw new Error('Invalid breakdownType');
};

export const canGetBreakdowns = async (breakdownType: string, lotCode: string): Promise<ValidationErrorViewModel[]> => {
  let errors = [];
  if (breakdownTypes.indexOf(breakdownType) === -1) {
    errors.push({
      code: 400,
      message: 'Bad Request',
    });
    return errors;
  }
  const breakdownExists = (await BreakdownModel.countDocuments({ lotCode })) > 0;
  if (!breakdownExists) {
    errors.push({
      code: 404,
      message: 'Not Found',
    });
    return errors;
  }

  return errors;
};

export const getBreakdowns = async (breakdownType: string, lotCode: string): Promise<BreakdownsViewModel> => {
  try {
    const breakdown: BreakdownDocument = await BreakdownModel.findOne({lotCode});
    return buildBreakdownsViewModel(breakdownType, breakdown.components);
  } catch (err) {
    throw err;
  }
};

export const getWineDetails = async (lotCode: string): Promise<WineDetailsViewModel | null> => {
  try {
    const result: BreakdownDocument = await BreakdownModel.findOne({ lotCode });
    if (result) {
      return {
        lotCode: result.lotCode,
        description: result.description,
        volume: result.volume,
        tank: result.tankCode,
        productState: result.productState,
        owner: result.ownerName,
      };
    }
    return null;
  } catch (err) {
    throw err;
  }
};

export const searchWineDetails = async (filter: string): Promise<WineSearchResultViewModel[]> => {
  try {
    const searchPattern = new RegExp(filter, 'i');
    const result: BreakdownDocument[] = await BreakdownModel.find({
      $or: [
        { lotCode: searchPattern },
        { description: searchPattern },
      ],
    });

    return result.map(result => ({
      description: result.description,
      lotCode: result.lotCode,
      tank: result.tankCode,
      volume: result.volume,
    }));
  } catch (err) {
    throw err;
  }
};

