export interface Breakdown {
  percentage: string;
  key: string;
};

export interface Breakdowns {
  breakdownType: string;
  breakdown: Breakdown[];
};
