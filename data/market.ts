export type MarketPoint = {
  day: string;
  demir: number;
  cimento: number;
  gazBeton: number;
};

export const marketTrend: MarketPoint[] = [
  { day: "Pzt", demir: 31850, cimento: 276, gazBeton: 158 },
  { day: "Sal", demir: 32040, cimento: 278, gazBeton: 160 },
  { day: "Çar", demir: 32120, cimento: 280, gazBeton: 162 },
  { day: "Per", demir: 32300, cimento: 282, gazBeton: 164 },
  { day: "Cum", demir: 32450, cimento: 285, gazBeton: 165 },
];

export const marketStats = [
  {
    label: "Demir",
    value: "₺32.450",
    unit: "Ton",
    change: "+%1.8",
  },
  {
    label: "Çimento",
    value: "₺285",
    unit: "Torba",
    change: "+%0.9",
  },
  {
    label: "Gaz Beton",
    value: "₺165",
    unit: "Adet",
    change: "+%1.1",
  },
];
